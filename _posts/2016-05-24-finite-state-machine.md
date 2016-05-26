---
layout: post
title: Finite State Machine
date: 2016-05-24
---

The concept of a state machine came up during my last post about the [State pattern](http://nicolecarpenter.github.io/2016/05/23/state-pattern.html), and again in the final chapter of Robert Martin’s *Agile Software Development- Principles, Patterns and Practices*, so I decided to dive a little deeper.

A [Finite State Machine](https://en.wikipedia.org/wiki/Finite-state_machine), also known as a state machine or FSM, according to wikipedia, is *a mathematical model of computation used to design both computer programs and sequential logic circuits*. 

A FSM consists of a *finite* number of states. When a symbol, like a letter, is input to the machine, the machine’s state changes in that the next state depends only on the current state and the input symbol. In other words, the new state depends on the old state and the input. What this means is that at any point, the entire history of the machine is available at the current state. It gets carried along and added to with each new state. 

![finite state machine](https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/CPT-FSM-01.svg/309px-CPT-FSM-01.svg.png)

In the image above, the circles represent states and the arrows are transitions from one state to another. If you are in **State 1** and you input 1, it maintains the state, but if you input 0, you are moved to state 2. From **State 2**, you have again the option to input 0 or 1, with 0 bringing you back to state 1, or 1 bringing you to **State 3**. In computing, we can see how this could be represented by binary digits to move from state to state. 

In programming, to set up a state machine, you would set up an array or some similar collection structure, which will store the possible states and a pointer would point to the starting position. Each state contains a lookup table that shows what the next state is given an input symbol. When a symbol is read in the program, the program will look up the symbol in the table and move the pointer to the new state.

Several resources reference a turnstile as a way to demonstrate the FSM concept. For a turnstile, there is either a locked or an unlocked state. The transition occurs when an input is presented. In the diagram below, the input is a coin, but I ride the L in the 21st century, so my input is a CTA.

![turnstile state machine](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Turnstile_state_machine_colored.svg/330px-Turnstile_state_machine_colored.svg.png)

Once the coin/card is scanned, the state of the turnstile changes from locked to unlocked. If I try to scan a card that is not the required CTA pass, like my American Express card, the turnstile will not recognize the input in its lookup table, and the state will remain unchanged. The transition from unlocked to locked is the input of a physical push. Once you pass through the turnstile by pushing the bar, the state is changed back to locked. 

The key to a Finite State Machine is that only one state can be active at a time. The turnstile can never be both locked and unlocked. In the same way a computer cannot be both on and off. A state machine is a way to organize behaviors. 
