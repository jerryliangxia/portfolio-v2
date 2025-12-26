---
title: "Game dev + AI"
date: "2024-08-26"
---

This past year I've worked on two AI projects.

# Playing Adversarial Chairs with A-Star Pathfinding

This first project involved A-Star pathfinding with dynamic obstacles.

![A-Star final init](/images/game-dev/astar-pathfinding/final_init.png)

Two groups of pathfinders were created - humans (white) and chairs (red). Humans were tasked with reaching a green target, while chairs tried to stop them.

Each chair was assigned a human to follow. Originally, they were assigned to the closest, but this led to a clustering effect.

![A-Star find closest](/images/game-dev/astar-pathfinding/findclosest.gif)

By assigning each chair to a human, more variation was possible:

![A-Star not find closest](/images/game-dev/astar-pathfinding/notfindclosest.gif)

After adding an isometric camera, this is the final scene:

![A-Star final not find closest](/images/game-dev/astar-pathfinding/finalnotfindclosest.gif)

The full demo can be found [here](https://jerrylxia.itch.io/pathfinding-demo) on itch.io.

# Hierarchical Task Network (HTN) Planning

This form of game AI was introduced by [Transformers: Fall of Cybertron](https://www.youtube.com/watch?v=kXm467TFTcY) in 2012. For this project, a minotaur guards a treasure while four adventurers try to steal it.

Using a HTN planning algorithm, the adventurers are able to assign themselves tasks based on their surroundings. They are also able to backtrack and re-plan if they fail their current task. This is the pseudocode:

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

The minotaur logic is: attack whoever is holding the treasure, otherwise attack the closest adventurer.

In HTN, there is a `Plan()` method that processes the world state and reduces composite tasks to primitive ones. In this project, these composite tasks are `TakeDamage`, `StealTreasure` and `AttackMinotaur`.

The first adventurer who spawns will be assigned `StealTreasure`. All others distract the minotaur (`AttackMinotaur`), which means (1) throwing rocks or (2) swinging their sword.

The minotaur has a radius attack. If damaged, the adventurer will fail their current task and begin a `TakeDamage` composite task, which stalls them so the minotaur can seek their next target. Once `TakeDamage` is completed, they backtrack to their original task.

The `BeAdventurer` tree:

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

Take note:

- If an adventurer doing `StealTreasure` is assigned `TakeDamage`, another adventurer will assume the composite task of `StealTreasure`.
- After recovering from the `TakeDamage` task, adventurers will continue their failed task (in this case, ‘StealTreasure’).

![HTN take damage](/images/game-dev/htn-planning/2.gif)

Below is a demo where the adventurers successfully obtain the treasure:

![HTN take damage](/images/game-dev/htn-planning/3.gif)

Another where they fail:

![HTN take damage](/images/game-dev/htn-planning/4.gif)

Here's the final scene:

![HTN take damage](/images/game-dev/htn-planning/5.gif)

You can play the game [here](https://jerrylxia.itch.io/htn-planning-and-reactive-ai-demo) on itch.io.
