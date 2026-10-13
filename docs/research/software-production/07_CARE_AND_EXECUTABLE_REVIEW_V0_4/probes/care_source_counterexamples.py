"""Bounded CPU research of CARE historical source; not a production validator.

Function bodies below transcribe the historical calculations. Model/parameter
surfaces are tiny test doubles, not trained networks. No GPU, medical data,
remote host, credentials, paid model or production checkout is accessed.
"""
from __future__ import annotations
import json
from pathlib import Path
from types import SimpleNamespace
import torch

COMMIT = "9517fe1738be5a03bc5d9115dade618ca3bc31b8"
SOURCE = f"https://github.com/YuukiAS/CARE_Challenge/blob/{COMMIT}/src/care_myocardium/training/care_ase_trainer.py"

def map_targets(logits, target):
    five = torch.cat([logits[:, :4], logits[:, 5:6]], dim=1)
    mapped = target.clone()
    mapped = torch.where(mapped == 5, torch.full_like(mapped, 4), mapped)
    mapped = torch.where(mapped == 4, torch.zeros_like(mapped), mapped)
    return five, mapped

def stage_trainability(model, global_step):
    step = int(global_step)
    stage = "A" if step < model.config.stage_a_steps else "B" if step < model.config.stage_a_steps + model.config.stage_b_steps else "C"
    for name, param in model.named_parameters():
        trainable = True
        if stage == "A" and (name.startswith("encoder.") or name.startswith("low_mid_") or name.startswith("anatomy_decoder.")):
            trainable = False
        if stage == "B" and name.startswith("encoder."):
            trainable = False
        param.requires_grad_(trainable)
    return stage

class TinyModel:
    def __init__(self):
        self.config = SimpleNamespace(stage_a_steps=2000, stage_b_steps=4000, stage_c_steps=8000)
        names = ("encoder.stages.0.weight", "encoder.stages.4.weight", "encoder.stages.5.weight", "low_mid_stages.0.weight", "scar_branch.weight")
        self.items = [(n, torch.nn.Parameter(torch.tensor([1.]))) for n in names]
    def named_parameters(self):
        return iter(self.items)

def historical_binary_loss(logit, target):
    target = target.to(logit)
    mask = torch.ones_like(target)
    prob = torch.sigmoid(logit)
    dims = tuple(range(1, prob.ndim))
    inter = (prob * target * mask).sum(dim=dims)
    denom = (prob * mask).sum(dim=dims) + (target * mask).sum(dim=dims)
    dice = (1.0 - (2.0 * inter + 1.0e-5) / (denom + 1.0e-5)).mean()
    bce = torch.nn.functional.binary_cross_entropy_with_logits(logit, target, reduction="none")
    return dice + ((bce * mask).sum() / mask.sum().clamp_min(1.0))

def run():
    labels = torch.tensor([-1,0,1,2,3,4,5])
    logits = torch.arange(42.).reshape(1,6,7)
    five, mapped = map_targets(logits, labels)
    assert mapped[-1].item() == 0
    assert torch.equal(five[:,4], logits[:,5])
    assert mapped[:5].tolist() == [-1,0,1,2,3]
    model = TinyModel()
    steps = [0,1999,2000,5999,6000,9999,10000,13999]
    actual = [stage_trainability(model, s) for s in steps]
    required = ["A" if s < 2000 else "B" if s < 10000 else "C" for s in steps]
    assert actual[4:6] == ["C","C"] and required[4:6] == ["B","B"]
    phase = stage_trainability(model, 3000)
    trainable = {n:p.requires_grad for n,p in model.named_parameters()}
    assert phase == "B" and not trainable["encoder.stages.4.weight"]
    z = torch.zeros((2,1,1,1,1), requires_grad=True)
    truth = torch.tensor([1.,0.]).reshape_as(z)
    availability = torch.tensor([1.,0.])
    loss = historical_binary_loss(z, truth) * availability.mean()
    gradients = torch.autograd.grad(loss, z)[0].flatten().tolist()
    assert gradients[1] != 0
    return {
        "kind":"LOCAL_SOURCE_COUNTEREXAMPLES_NOT_SYSTEM_ACCEPTANCE",
        "historical_commit":COMMIT, "source":SOURCE,
        "environment":{"device":"cpu","torch":torch.__version__},
        "input_scope":"tiny tensor and named-parameter surfaces",
        "network":False,"gpu":False,"raw_medical_data":False,"production_modified":False,
        "findings":[
            {"id":"P01","ledger":"C34","input":labels.tolist(),"observed":mapped.tolist(),"required_scar_target":4,"selected_scar_logit_channel_correct":True},
            {"id":"P02","ledger":"C26","steps":steps,"observed":actual,"required":required},
            {"id":"P03","ledger":"C27","step":3000,"phase":phase,"observed":trainable,"required":"upper two encoder stages trainable"},
            {"id":"P04","ledger":"X01_NOT_COUNTED_AS_FORMAL_EVENT","observed_edema_gradients":gradients,"scope":"Mixed-batch stress only. Historical formal physical batch was 1; no claim this mixed case occurred during formal training."}
        ],
        "not_proven":["full model outcome","current CARE failures","new workflow prevention","reviewer effectiveness"]
    }

if __name__ == "__main__":
    report = json.dumps(run(), ensure_ascii=False, indent=2) + "\n"
    Path(__file__).with_name("care_source_counterexamples.result.json").write_text(report, encoding="utf-8")
    print(report)
