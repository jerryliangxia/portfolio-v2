---
title: "Adventures in game dev"
date: "2024-08-26"
---

This past year I've worked on two AI projects.

# Playing Adversarial Chairs with A-Star Pathfinding

This first project involved A-Star pathfinding with dynamic obstacles.

![A-Star final init](/images/game-dev/astar-pathfinding/final_init.png)

Two groups of pathfinders were created - humans (white) and chairs (red). Humans were tasked with reaching a green target, while chairs obstructed human movement.

Each chair was assigned a human to follow. Originally, they were assigned to the closest, but this led to a clustering effect.

![A-Star find closest](/images/game-dev/astar-pathfinding/findclosest.gif)

By assigning each chair to a human, more variation was possible:

![A-Star not find closest](/images/game-dev/astar-pathfinding/notfindclosest.gif)

Adding an isometric camera led to this final scene:

![A-Star final not find closest](/images/game-dev/astar-pathfinding/finalnotfindclosest.gif)

The full demo can be found [here](https://jerrylxia.itch.io/pathfinding-demo) on itch.io.

# Hierarchical Task Network Planning

This form of game AI was introduced by [Transformers: Fall of Cybertron](https://www.youtube.com/watch?v=kXm467TFTcY) in 2012. For this project, a minotaur guarded a treasure while four adventurers, controlled by a Hierarchical Task Network (HTN) attempted to steal it.

Using a HTN planning algorithm, the adventurers are able to assign themselves tasks based on their surroundings. They are also able to backtrack and re-plan if they fail their current task. Roughly, this is the pseudocode:

```csharp
Plan: <>
State: current world state
tasks.push(rootTask)
while(tasks != empty) {
	t = tasks.pop()
	if(t.composite) {
		m = t.findMethod(state)
		if(m != null) {
			saveState(t, plan, m)
			tasks.push(m.subtasks)
		} else {
			restoreSavedState() <- backtrack
		}
	} else {
		if(t.precondition(state)) {
			state = t.apply(state)
			plan.append(t)
		} else {
			restoreSavedState() <- backtrack
		}
	}
}
```

The minotaur is simple - attack whoever is holding the treasure, otherwise, attack the closest adventurer.

In HTN, there is a `Plan()` function that processes the world state and reduces composite tasks to a list of primitive ones. In this project, these composite tasks are `TakeDamage`, `StealTreasure` and `AttackMinotaur`.

The first adventurer who spawns will be assigned `StealTreasure`. All others distract the minotaur (`AttackMinotaur`), which either means throwing rocks from afar or swinging their sword, depending on their assigned role.

The minotaur has a radius attack, meaning any adventurer in a radius `r` of the minotaur takes damage. If so, they fail their current task and immediately begin a `TakeDamage` composite task, which involves some stalling so the minotaur can seek their next target. Once `TakeDamage` is completed, they backtrack to their original task.

The `BeAdventurer` tree is shown below:

```
BeAdventurer
|
|-- Method 0 (Navigate to Treasure)
|   |
|   |-- NavToTarget
|   |   |
|   |   |-- NavToTargetLocation (Either Treasure or Minotaur)
|   |   |
|   |   |-- NavToMinotaurLOS (Far-Rangers seek Minotaur for Attack)
|   |
|   |-- PickUpTreasure
|   |
|   |-- MoveToSpawn
|
|-- Method 1 (Navigate to Minotaur)
|   |
|   |-- NavToTarget
|   |   |
|   |   |-- NavToTargetLocation (Either Treasure or Minotaur)
|   |   |
|   |   |-- NavToMinotaurLOS (Far-Rangers seek Minotaur for Attack)
|   |
|   |-- DoAttack
|   |   |
|   |   |-- DoCloseRangeAttack (If Close-Combat Adventurer)
|   |   |
|   |   |-- DoFarRangeAttack (If Far-Range Adventurer)
|   |
|   |-- Recover
|
|-- Method 2 (Take Damage)
    |
    |-- TakeDamage
        |
        |-- Method 0
        |   |
        |   |-- TakeDamageToHealth
        |   |   |
        |   |   |-- Recover (Can take n > 1 hits)
        |   |   |
        |   |   |-- Despawn (Can take n = 0 hits)
        |
        |-- Method 1
            |
            |-- DropTreasure
            |
            |-- TakeDamageToHealth
                |
                |-- Recover (Can take n > 1 hits)
                |
                |-- Despawn (Can take n = 0 hits)
```

To test backtracking, a `TakeDamageTest` function was implemented, which made the adventurer fail their current task whenever they were clicked.

![HTN take damage](/images/game-dev/htn-planning/1.gif)

In this next demo, the following can be seen:

- If an adventurer doing `StealTreasure` is assigned `TakeDamage`, another adventurer will assume the composite task of `StealTreasure`.
- After recovering from the `TakeDamage` task, adventurers will continue their failed task (in this case, ‘StealTreasure’).

![HTN take damage](/images/game-dev/htn-planning/2.gif)

Health bars were added to enhance scene visualization, and the camera angle was adjusted to a higher perspective. Below is a demo where the adventurers successfully obtain the treasure:

![HTN take damage](/images/game-dev/htn-planning/3.gif)

And another where they fail to:

![HTN take damage](/images/game-dev/htn-planning/4.gif)

After adding an environment, here's the final scene:

![HTN take damage](/images/game-dev/htn-planning/5.gif)

You can play the game [here](https://jerrylxia.itch.io/htn-planning-and-reactive-ai-demo) on itch.io.

# Onwards

In the future, an in-depth exploration of a rendering engine will be explored. So far, I’ve built a ray tracer in Python you can read about [here](link).
