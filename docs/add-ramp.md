# add Ramp

Add a ramp up or down to the roller coaster.

```sig
rollerCoasterBuilder.addRamp(RcbVerticalDirection.Up, LEFT_TURN, 10, 3)
```

This adds a ramp up or down to your roller coaster. By default, it will slope 1 block up/down for every 1 block forward, but if you expand the block, you may specify a more gradual slope by increasing the number of blocks moved forward for every 1 block moved vertically.

## Parameters

* **direction**: the vertical direction of the ramp, `up` or `down`.
* **distance**: the distance, up or down, of the ramp.
* **horizSpace**: (optional) the amount of horizontal length for each block of `distance`, defaults to `1`.

```package
makecode-minecraft-roller-coaster=github:microsoft/makecode-minecraft-roller-coaster
```