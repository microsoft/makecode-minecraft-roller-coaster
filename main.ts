enum RcbVerticalDirection {
    //% block="up" blockId="rollerCoasterBuilderUp"
    Up,
    //% block="down" blockId="rollerCoasterBuilderDown"
    Down
}
enum RcbPowerLevel {
    //% block="full" blockId="rollerCoasterBuilderFullPower"
    Full,
    //% block="normal" blockId="rollerCoasterBuilderNormalPower"
    Normal,
    //% block="no" blockId="rollerCoasterBuilderNoPower"
    No
}

//% color="#9C5F9B" block="Roller Coaster" icon="\uf3ff"
namespace rollerCoasterBuilder {

    let _coasterBuilder = new builder.Builder();

    let railBase = PLANKS_OAK
    let powerInterval = 5 // Keep between 1 and 8, else minecarts may stop between power
    let trackStartX = 0
    let trackStartY = 0
    let trackStartZ = 0
    let hasTrackStart = false

    // Can be disabled for perf.
    let waterProtection = true
    let lavaProtection = true

    //% block="add single rail to track"
    //% blockId="rcbAddRail" weight=65
    export function addRail() {
        placeRailInternal(_coasterBuilder.position(), railBase, RAIL)
    }

    //% block="add single powered rail to track"
    //% blockId="rcbAddPoweredRail" weight=70
    export function addPoweredRail() {
        placeRailInternal(_coasterBuilder.position(), REDSTONE_BLOCK, POWERED_RAIL)
    }

    // Intentionally not exposed, as it's a bit confusing...
    function addUnpoweredPoweredRail() {
        placeRailInternal(_coasterBuilder.position(), railBase, POWERED_RAIL)
    }

    function placeAirAbove(position: Position, start: number, dist: number) {
        for (let i = 0; i <= dist - 1; i++) {
            // Check for air first or we get a bunch of "cannot place block" errors.
            const pos = position.move(CardinalDirection.Up, i + start)
            if (!blocks.testForBlock(AIR, pos)) {
                blocks.place(AIR, pos)
            }
        }
    }

    function replaceWaterAndLava(cornerOne: Position, cornerTwo: Position) {
        if (waterProtection) {
            blocks.replace(GLASS, 9, cornerOne, cornerTwo) // 9 == also water?
            blocks.replace(GLASS, WATER, cornerOne, cornerTwo)
        }
        if (lavaProtection) {
            blocks.replace(GLASS, 11, cornerOne, cornerTwo) // 11 == also lava?
            blocks.replace(GLASS, LAVA, cornerOne, cornerTwo)
        }
    }

    function placeRailInternal(position: Position, baseBlock: number, railBlock: number) {
        blocks.place(baseBlock, position)

        if (waterProtection || lavaProtection) {
            const southWestDownCorner = position.move(CardinalDirection.South, 1).move(CardinalDirection.West, 1).move(CardinalDirection.Up, 1)
            const northEastUpCorner = position.move(CardinalDirection.North, 1).move(CardinalDirection.East, 1).move(CardinalDirection.Up, 4)
            replaceWaterAndLava(southWestDownCorner, northEastUpCorner)
        }

        // Need air blocks so player can fit if the track tunnels (or intersects with something).
        placeAirAbove(position, 1, 3)

        blocks.place(railBlock, position.move(CardinalDirection.Up, 1))
    }

    function getButtonAuxForDirection(direction: CompassDirection) {
        switch (direction) {
            case CompassDirection.North:
                return 5;
            case CompassDirection.East:
                return 3;
            case CompassDirection.South:
                return 4;
            case CompassDirection.West:
                return 2;
            default:
                return 0;
        }
    }

    //% block="begin track at $position heading $direction"
    //% position.shadow=minecraftCreatePosition
    //% direction.defl=CompassDirection.North
    //% powerLevel.defl=RcBldPowerLevel.Normal
    //% blockId="rcbBeginTrack" weight=100
    export function placeTrackStart(position: Position, direction: CompassDirection) {
        // Block presets
        let btnBkgBlock = PINK_CONCRETE
        let nonBtnBkgBlock = BLOCK_OF_QUARTZ
        let rampBlock = QUARTZ_SLAB
        let btn = WARPED_BUTTON
        let btnAux = getButtonAuxForDirection(direction)

        _coasterBuilder.teleportTo(position)
        _coasterBuilder.face(direction)

        // Rails
        addUnpoweredPoweredRail()
        _coasterBuilder.move(FORWARD, 1)
        addUnpoweredPoweredRail()
        _coasterBuilder.move(FORWARD, 1)
        addRail()

        // Ramp
        _coasterBuilder.move(RIGHT, 1)
        _coasterBuilder.place(rampBlock)
        placeAirAbove(_coasterBuilder.position(), 1, 3)
        _coasterBuilder.move(BACK, 1)
        _coasterBuilder.place(rampBlock)
        placeAirAbove(_coasterBuilder.position(), 1, 3)
        _coasterBuilder.move(BACK, 1)
        _coasterBuilder.place(rampBlock)
        placeAirAbove(_coasterBuilder.position(), 1, 3)

        // Non-Button Background
        _coasterBuilder.move(BACK, 1)
        _coasterBuilder.mark()
        _coasterBuilder.move(LEFT, 1)
        _coasterBuilder.raiseWall(nonBtnBkgBlock, 4)

        // Btn Background
        _coasterBuilder.move(LEFT, 1)
        _coasterBuilder.mark()
        _coasterBuilder.move(LEFT, 1)
        _coasterBuilder.raiseWall(btnBkgBlock, 4)
        _coasterBuilder.mark()
        _coasterBuilder.move(FORWARD, 3)
        _coasterBuilder.raiseWall(btnBkgBlock, 4)
        _coasterBuilder.move(RIGHT, 1)
        _coasterBuilder.place(btnBkgBlock)
        placeAirAbove(_coasterBuilder.position(), 1, 3)
        _coasterBuilder.move(BACK, 1)
        _coasterBuilder.place(btnBkgBlock)
        placeAirAbove(_coasterBuilder.position(), 1, 3)
        _coasterBuilder.move(BACK, 1)
        _coasterBuilder.place(btnBkgBlock)
        placeAirAbove(_coasterBuilder.position(), 1, 3)

        // Redstone
        _coasterBuilder.move(UP, 1)
        _coasterBuilder.place(REDSTONE_WIRE)

        // Button
        _coasterBuilder.move(UP, 1)
        _coasterBuilder.place(blocks.blockWithData(btn, btnAux))

        // Minecart
        _coasterBuilder.shift(0, -1, -1)
        player.execute(`summon minecart ${_coasterBuilder.position().toString()}`)

        // Set builder location for next piece of track
        _coasterBuilder.shift(3, -1, 0)

        trackStartX = _coasterBuilder.position().getValue(Axis.X)
        trackStartY = _coasterBuilder.position().getValue(Axis.Y)
        trackStartZ = _coasterBuilder.position().getValue(Axis.Z)
        hasTrackStart = true
    }

    //% block="place track end"
    //% position.shadow=minecraftCreatePosition
    //% direction.defl=CompassDirection.North
    //% powerLevel.defl=RcBldPowerLevel.Normal
    //% blockId="rcbPlaceEndTrack" weight=99
    export function placeTrackEnd() {
        addRail()
        _coasterBuilder.move(FORWARD, 1)
        _coasterBuilder.place(railBase)
        _coasterBuilder.move(UP, 1)
        _coasterBuilder.place(railBase)
        _coasterBuilder.shift(1, -1, 0)
    }

    function getDirectionForDeltaX(deltaX: number): CardinalDirection {
        return deltaX >= 0 ? CardinalDirection.East : CardinalDirection.West
    }

    function getDirectionForDeltaZ(deltaZ: number): CardinalDirection {
        return deltaZ >= 0 ? CardinalDirection.South : CardinalDirection.North
    }

    function getOppositeDirection(direction: CardinalDirection): CardinalDirection {
        switch (direction) {
            case CardinalDirection.North:
                return CardinalDirection.South
            case CardinalDirection.South:
                return CardinalDirection.North
            case CardinalDirection.East:
                return CardinalDirection.West
            default:
                return CardinalDirection.East
        }
    }

    //% block="close loop to track start"
    //% blockId="rcbCloseTrackLoop" weight=98
    export function closeTrackLoop() {
        if (!hasTrackStart) return

        let currentPos = _coasterBuilder.position()
        let deltaX = trackStartX - currentPos.getValue(Axis.X)
        let deltaY = trackStartY - currentPos.getValue(Axis.Y)
        let deltaZ = trackStartZ - currentPos.getValue(Axis.Z)
        let xSteps = Math.abs(deltaX)
        let zSteps = Math.abs(deltaZ)

        let steps: CardinalDirection[] = []
        const xDirection = getDirectionForDeltaX(deltaX)
        const zDirection = getDirectionForDeltaZ(deltaZ)

        if (xSteps >= zSteps) {
            for (let i = 0; i < xSteps; i++) steps.push(xDirection)
            for (let i = 0; i < zSteps; i++) steps.push(zDirection)
        } else {
            for (let i = 0; i < zSteps; i++) steps.push(zDirection)
            for (let i = 0; i < xSteps; i++) steps.push(xDirection)
        }

        if (Math.abs(deltaY) > steps.length) {
            const verticalDeficit = Math.abs(deltaY) - steps.length
            // If vertical distance is larger than available horizontal path length,
            // add a short out-and-back detour so the rails can keep climbing/descending.
            const detourDirection = xSteps > 0
                ? xDirection
                : (zSteps > 0 ? zDirection : CardinalDirection.East)
            const returnDirection = getOppositeDirection(detourDirection)
            for (let i = 0; i < Math.ceil(verticalDeficit / 2); i++) {
                steps.push(detourDirection)
                steps.push(returnDirection)
            }
        }

        let verticalStepDirection = deltaY >= 0 ? CardinalDirection.Up : CardinalDirection.Down
        let verticalStepsRemaining = Math.abs(deltaY)
        let poweredRailsPlaced = 0

        for (let i = 0; i < steps.length; i++) {
            if (poweredRailsPlaced % powerInterval === 0) {
                placeRailInternal(currentPos, REDSTONE_BLOCK, POWERED_RAIL)
            } else {
                placeRailInternal(currentPos, railBase, RAIL)
            }
            poweredRailsPlaced++

            currentPos = currentPos.move(steps[i], 1)
            if (verticalStepsRemaining > 0) {
                currentPos = currentPos.move(verticalStepDirection, 1)
                verticalStepsRemaining--
            }
        }

        placeRailInternal(currentPos, railBase, RAIL)
        _coasterBuilder.teleportTo(currentPos)
    }

    //% block="add straight line of length $length || with $powerLevel power"
    //% length.defl=10 length.min=1
    //% powerLevel.defl=RcBldPowerLevel.Normal
    //% blockId="rcbAddStraightLine" weight=95
    export function addStraightLine(length: number, powerLevel: RcbPowerLevel = RcbPowerLevel.Normal) {
        for (let index = 0; index < length; index++) {
            if (powerLevel !== RcbPowerLevel.No && index % powerInterval === 0) {
                addPoweredRail()
            } else if (powerLevel === RcbPowerLevel.Full) {
                addUnpoweredPoweredRail()
            } else {
                addRail()
            }
            _coasterBuilder.move(FORWARD, 1)
        }
    }

    //% block="add ramp $direction $distance blocks || changing 1 block vertically every $horizSpace blocks forward"
    //% distance.defl=10
    //% horizSpace.defl=1
    //% horizSpace.min=1
    //% blockId="rcbAddRamp" weight=90
    export function addRamp(direction: RcbVerticalDirection, distance: number, horizSpace: number = 1) {
        if (direction === RcbVerticalDirection.Up) {
            rampUp(distance, horizSpace);
        }
        else {
            rampDown(distance, horizSpace);
        }
    }

    function rampUp(height: number, horizSpace: number) {
        let unpoweredBlocksPlaced = 8; // Set to 8 so first block is powered.
        for (let currentHeight = 0; currentHeight <= height; currentHeight++) {
            for (let currentHoriz = 0; currentHoriz < horizSpace; currentHoriz++) {
                if (unpoweredBlocksPlaced >= 8) {
                    addPoweredRail()
                    unpoweredBlocksPlaced = 0
                } else {
                    addUnpoweredPoweredRail()
                    unpoweredBlocksPlaced++
                }
                _coasterBuilder.move(FORWARD, 1)
            }
            _coasterBuilder.move(UP, 1);
        }
        _coasterBuilder.move(DOWN, 1)
    }

    function rampDown(descentDistance: number, horizSpace: number) {
        for (let currentDescent = 0; currentDescent <= descentDistance; currentDescent++) {
            for (let currentHoriz = 0; currentHoriz < horizSpace; currentHoriz++) {
                // Place powered at start only if needed, then every powerInterval blocks.
                // Only needed on first descent level since the rest have the downhill to speed up.
                let powerAtStart = currentDescent === 0 && horizSpace >= powerInterval;
                if ((currentHoriz + (powerAtStart ? 0 : 1)) % powerInterval === 0) {
                    addPoweredRail()
                }
                else {
                    addRail()
                }
                _coasterBuilder.move(FORWARD, 1)
            }
            _coasterBuilder.move(DOWN, 1)
        }

        // Undo the final down movement, since we didn't actually place a block.
        _coasterBuilder.move(UP, 1)
    }

    //% block="add $direction turn"
    //% blockId="rcbAddTurn" weight=85
    export function addTurn(direction: TurnDirection) {
        addRail();
        _coasterBuilder.move(FORWARD, 1);
        addRail();
        _coasterBuilder.turn(direction);
        _coasterBuilder.move(FORWARD, 1);
        addRail();
        _coasterBuilder.move(FORWARD, 1);
    }

    //% block="add spiral going $verticalDirection turning $turnDirection with width $width and height $height"
    //% width.min=3 width.defl=3
    //% height.min=1 height.defl=10
    //% blockId="rcbAddSpiral" weight=80
    export function addSpiral(verticalDirection: RcbVerticalDirection, turnDirection: TurnDirection, height: number = 10, width: number = 3) {
        let totalHeightDiff = 0
        while (totalHeightDiff < height) {
            let heightChange = verticalDirection === RcbVerticalDirection.Up && totalHeightDiff === 0 ? width - 1 : width - 2
            if (totalHeightDiff + heightChange > height) {
                heightChange = height - totalHeightDiff
            }

            if (heightChange === 0) return; // Error
            if (verticalDirection === RcbVerticalDirection.Up) {
                // Build ramp to height - 1, then unpower the final rail in the ramp so it can turn.
                addRamp(verticalDirection, heightChange - 1, 1)
                _coasterBuilder.move(UP, 1)
                addRail()
            } else {
                addRamp(verticalDirection, heightChange, 1)
            }

            totalHeightDiff += heightChange

            // Turn (unless we're done, in which case allow track to continue straight)
            if (totalHeightDiff != height) {
                _coasterBuilder.turn(turnDirection)
            }

            if (verticalDirection === RcbVerticalDirection.Up) {
                _coasterBuilder.move(FORWARD, 1)
            }
        }
    }

    //% block="add free fall of height $height"
    //% height.min=4 height.max=384 height.defl=10
    //% blockId="rcbAddFreeFall" weight=75
    export function addFreeFall(height: number) {
        // Clear out free-fall area
        let startPos = _coasterBuilder.position()
        let cornerOne = undefined
        let cornerTwo = undefined
        _coasterBuilder.move(UP, 2)
        _coasterBuilder.mark()

        if (waterProtection || lavaProtection) {
            // This is icky, but I don't know of a better way to get it relative to facing direction.
            _coasterBuilder.shift(-1, 1, 1)
            cornerOne = _coasterBuilder.position()
            _coasterBuilder.shift(1, -1, -1)
        }

        _coasterBuilder.shift(2, -height - 2, 0)

        if (waterProtection || lavaProtection) {
            _coasterBuilder.shift(1, -1, -1)
            cornerTwo = _coasterBuilder.position()
            _coasterBuilder.shift(-1, 1, 1)
        }

        replaceWaterAndLava(cornerOne, cornerTwo)

        _coasterBuilder.fill(AIR)
        _coasterBuilder.teleportTo(startPos)

        // Create wall to stop cart from moving forwards once it's off the track
        addRail()
        _coasterBuilder.move(FORWARD, 2)
        _coasterBuilder.mark()
        _coasterBuilder.move(UP, 2)
        _coasterBuilder.fill(railBase, FillOperation.Keep)

        // We need a bit of a ramp at the bottom to get moving again.
        _coasterBuilder.move(BACK, 2)
        _coasterBuilder.move(DOWN, height)
        addUnpoweredPoweredRail()
        _coasterBuilder.move(FORWARD, 1)
        _coasterBuilder.move(DOWN, 1)
        addPoweredRail()
        _coasterBuilder.move(FORWARD, 1)
        _coasterBuilder.move(DOWN, 1)
        addUnpoweredPoweredRail()
    }

    //% group="Customization"
    //% block="set base block to $blockType"
    //% blockType.shadow=minecraftBlock
    //% blockId="rcbSetBaseBlock" weight=20
    export function setRollerCoasterBaseBlock(blockType: number) {
        railBase = blockType
    }

    //% group="Customization"
    //% block="set normal power interval to $interval"
    //% interval.defl=5 interval.min=1 interval.max=8
    //% blockId="rcbSetPowerInterval" weight=19
    export function setNormalPowerInterval(interval: number = 5) {
        powerInterval = interval
    }

    //% group="Customization"
    //% block="set water protection to $value"
    //% value.defl=true
    //% blockId="rcbSetWaterProtection" weight=18
    export function setWaterProtection(value: boolean) {
        waterProtection = value
    }

    //% group="Customization"
    //% block="set lava protection to $value"
    //% value.defl=true
    //% blockId="rcbSetLavaProtection" weight=17
    export function setLavaProtection(value: boolean) {
        lavaProtection = value
    }
}