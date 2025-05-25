---
title: Understanding Capacitor Charging and the Concept of Full Charge
description: Explore the science behind capacitor charging, the significance of 5τ, and why capacitors never truly reach full charge despite practical approximations.
date: 2025-01-20
tags:
  - Electronics
draft: "false"
---
While taking a [course with Walid Issa](https://youtube.com/playlist?list=PLww54WQ2wa5qVh1p8iPi7HspX7N9hbvbc&si=9h1KH2NZG2lSLsaB), we explored the fascinating behavior of capacitors. During one of the experiments, an interesting observation about capacitor charging sparked my curiosity. My friend [Ahmad Awad](https://www.linkedin.com/in/ahmad-awad-36b481301/) and I decided to dive deeper into the topic, conducting research that ultimately led to this blog.

When analyzing capacitors, we often hear that a capacitor is "fully charged" when the elapsed time equals 5 times the time constant (“5τ”). However, upon closer look, this statement needs some clarification. Let's dive into the theory, practical observations, and what "fully charged" really means.

## Observations from the Simulation

![](/images/Pasted%20image%2020250121022953.png)
![](/images/Pasted%20image%2020250121023020.png)


In a recent calculation, the capacitor was expected to be fully charged in 0.25 seconds. However, the voltage across the capacitor at this point was 11.923 V instead of the expected 12 V. The error was calculated as:

$$ \frac{12 - 11.923}{12} \times 100 = 0.6\% $$ 

This raised the question: Why is there an error when the capacitor is supposed to be fully charged at 5τ?

## The Truth About 5τ

The value of 5τ does not mean the capacitor is 100% charged. Instead, it means the capacitor has reached about 99.3% of its maximum voltage. Using the data from the simulation, we can confirm this:

$$ \frac{11.923}{12} \times 100 = 99.33\% $$

This matches the theoretical prediction. While the capacitor seems nearly charged at 5τ, it never fully reaches 100% because of the exponential nature of its charging curve.

## Theoretical Explanation

![](/images/Pasted%20image%2020250121015614.png)


The voltage across a charging capacitor is given by the equation:

$$ V(t) = V_{\text{max}} \left( 1 - e^{-\frac{t}{RC}} \right) $$

where:

- Vmax is the maximum voltage the capacitor can charge to (12 V in this case).
- t is the time elapsed.
- RC is the time constant of the circuit.

As time passes, $$e^{-t/RC}$$ gets closer to zero. 

![](/images/Pasted%20image%2020250121015737.png)
This means it would take infinite time for the capacitor to reach exactly Vmax. In practice, we consider the capacitor "fully charged" when it’s close enough to Vmax, such as 99.3% at 5τ.

## The Simulation Discrepancy

![](/images/Pasted%20image%2020250121020039.png)

Interestingly, the simulation showed the capacitor reaching exactly 12 V, which seems to go against the theory. Why did this happen?

1. **Oscilloscope Precision:** Oscilloscopes show voltages with limited precision. If the capacitor voltage is extremely close to the maximum (e.g., 11.999999 V), the oscilloscope rounds it to 12 V.
2. **Rounding Effects:** The actual voltage might still be slightly below 12 V, but the measuring device’s resolution hides these small differences. Higher-resolution equipment would show the tiny gap.

## Key Takeaways

- At 5τ, a capacitor is 99.3% charged, not 100%.
- It would take infinite time for a capacitor to reach exactly $Vmax$.
- Simulations and measurements often show Vmax due to rounding and device limitations.
- This approximation is fine for real-world use, as the difference is too small to matter.

Understanding these details gives a clearer picture of how capacitors behave and avoids common misunderstandings about what "fully charged" means.