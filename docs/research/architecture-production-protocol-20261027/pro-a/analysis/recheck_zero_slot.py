"""Independent standard-library arithmetic check; fixed synthetic inputs only.

Run with Python 3.8+ from any directory: python /path/to/recheck_zero_slot.py
No source checkout, installed package, model execution, or network is required.
This is a separately written check of the scalar normal-tail integral and its
Laplace approximation, not a replay of the historical mpmath-based script.
The grid-refinement difference is a numerical diagnostic, not a rigorous error
bound. The n=1 analytic case is an additional check, not fitted-model validation.
"""
import json, math, statistics, sys

def check(n,p,gamma=3.0):
    tau2=2*math.log(p); tau=math.sqrt(tau2)
    mu=math.sqrt(1+tau2)*statistics.NormalDist().inv_cdf(gamma/(gamma+p))
    def complement(u):
        a=mu+tau*u
        tail=0.5*math.erfc(a/math.sqrt(2))
        loss=1.0 if tail==0 else -math.expm1(n*math.log(tail))
        return loss*math.exp(-u*u/2)/math.sqrt(2*math.pi)
    def simpson(m):
        h=24/m
        return h/3*(complement(-12)+complement(12)+sum((4 if k%2 else 2)*complement(-12+k*h) for k in range(1,m)))
    logs=[math.log1p(-simpson(m)) for m in (20000,40000)]
    a=mu
    for _ in range(30):
        r=math.exp(-a*a/2)/math.sqrt(2*math.pi)/(0.5*math.erfc(a/math.sqrt(2)))
        H=1/tau2+n*r*(r-a)
        step=(-n*r-(a-mu)/tau2)/H
        a+=step
        if abs(step)<1e-13:break
    logpost=n*math.log(0.5*math.erfc(a/math.sqrt(2)))-0.5*((a-mu)/tau)**2-math.log(tau*math.sqrt(2*math.pi))
    lap=logpost+0.5*math.log(2*math.pi)-0.5*math.log(H)
    return dict(n=n,p=p,gamma=gamma,log_integral=logs[-1],refinement_difference=logs[-1]-logs[0],log_laplace=lap,weighted_error=p*(lap-logs[-1]),n1_analytic=(-math.log1p(gamma/p) if n==1 else None))

if __name__=='__main__':
    cases=[check(1,1000),check(100,100),check(100,1000),check(100,10000),check(100,1000000)]
    checks={
        'finite_outputs':all(math.isfinite(c[k]) for c in cases for k in ('log_integral','log_laplace','weighted_error')),
        'n1_matches_analytic_within_1e_12':abs(cases[0]['log_integral']-cases[0]['n1_analytic'])<1e-12,
        'grid_refinement_difference_below_1e_12':all(abs(c['refinement_difference'])<1e-12 for c in cases),
    }
    print(json.dumps(dict(label='Independent deterministic arithmetic recheck, not original script replay, not fitted-model validation',python=sys.version,dependencies='Python standard library only',checks=checks,cases=cases),indent=2))
    raise SystemExit(0 if all(checks.values()) else 1)
