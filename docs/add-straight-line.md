# add Straight Line

Add a straight line of the specified length to your roller coaster.

```sig
rollerCoasterBuilder.addStraightLine(1)
```

This adds a straight line of the specified length to your roller coaster. If you expand the block, you can select a power level for the segment.

## Parameters

* **length**: the length of the straight line section of track.
* **powerlevel**: (optional) the power level for this section of track. defaults to `normal`:

>* `full`: will ensure every rail in the segment is powered, making your roller coaster accelerate.
>* `normal`: will place powered rails at a fixed interval (see **setNormalPowerInterval**). Your coaster will maintain a steady pace.
>* `no`: no powered rails will be added. This will cause the roller coaster to slow down. 

**Caution!**: If the segment is long enough, the coaster could stop completely!

```package
makecode-minecraft-roller-coaster=github:microsoft/makecode-minecraft-roller-coaster
```