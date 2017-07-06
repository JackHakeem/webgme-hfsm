# UML State Machine Software Generator Design

This document describes how the UML State Machine meta maps into
executable C++ code.

# TODO:

* Properly handling transitions into history pseudostates,
  specifically how to make sure we go up the tree and call the exit
  actions properly until we reach the proper parent state and then
  call all the entry actions down the proper child subtree.
* Determine the right way to end the state machine, e.g. what do we do
  when the top-level end state is reached?
* How will the tick events be generated and handled?

# IDEAS:

* For the history substates, we know exactly at model transformation
  time what the root parent for the transition is, so we can call the
  exit actions on the parent which will recursively call exit down to
  the leaf active state. We then just need a method for setting the
  proper state that we will be transitioning to and calling all the
  right entry actions.

# States

States get generated into their own class definitions which are
instantiated once and which inherit from StateMachine::StateBase.  A
state is contained within the scope / namespace of its parent state.
A state has a reference to which of its children is the currently
active substate (if any exist) and a list of all its child substates.

## Special States

Certain special states exist; this section describes how these special
states are implemented.

### Initial States

Intial states are generated as a pointer to the correct child state in
a function of the parent state called `getInitial()`. This pointer is
constant since the initial state is known directly from the model.

### End States

Directly transition to the state defined by the model and if no state
exists, we must be in the final end state for the state machine and
should end the state machine. Easy to generate because we know from
the model what the ultimate state will be. Just need to properly call
exit / entry actions.

### Choice Pseudostates

Choice Pseudostates are generated as conditional blocks within the
originating transition code to directly check the ensuing guards for
the outbound transitions of the choice pseudostates and determine
which state to transition to directly. The end states are hardcoded
in.

### Deep History Pseudostates

Transitions to deep history substates are generated as transitions to
the parent containing the history substate and will call the parent
state's `setDeepHistory()`.

### Shallow History Pseudostates

Transitions to shallow history substates are generated as transitions
to the parent containing the history substate and will call the parent
state's `setShallowHistory()`.

# Events

Events can get generated by states in the machine or other code
running on the target system. These events will be propagated through
to the current active leaf state of the HFSM and then bubble their way
up to the root until they reach a state which has internal or external
transitions that handle that event at which point the event will be
consumed.

## Event Factory

Events are managed in a FIFO Queue by the Event Factory, which is the
only place that spawns or consumes event objects. All states have
access to the Event Factory singleton and can call `spawnEvent( )`
which will create a new Event object of that type and add it to the
Event Factory's queue. The next event in the Queue can be accessed by
calling `getNextEvent( )`, and the event returned can be later
destroyed by calling `consumeEvent( )` which will free the memory
associated with the event.

# Transitions

Transitions are generated as a sequence of conditionals on the Event
itself, followed by the conditionals of the guards on any of the
transitions that have that event.

## Internal Transitions

Internal transitions will be checked in the state before any external
transitions.

## External Transitions

External transitions are the last transitions of a state to be
checked; if the Event has not been handled by the external
transitions, then the event propagates to the parent state and
continues evaluation.