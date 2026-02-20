# add Spiral

Add a spiral section section to the roller coaster track.

```sig
rollerCoasterBuilder.addSpiral(RcbVerticalDirection.Up, LEFT_TURN, 10, 3)
```

This adds a corkscrew-like spiral to your roller coaster, turning in circles while moving up or down. The width specifies how large the circles will be while the height specifies how far up or down the corkscrew will go.

## Parameters

* **verticalDirection**: the vertical direction of the spiral track, `up` or `down`.
* **turnDirection**: the direction of the spiral turns, `left` or `right`.
* **height**: (optional) height of the spiral in blocks, defaults to `10`.
* **width**: (optional) the diameter of the spiral circles in blocks, defaults to `3`.

```package
makecode-minecraft-roller-coaster=github:microsoft/makecode-minecraft-roller-coaster
```