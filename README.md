# Roller Coaster Builder
This is a MakeCode Extension for Minecraft Education that allows you to create minecart roller coasters using code, then ride them!

# Contents
1. [What is a Minecart Roller Coaster?](#what-is-a-minecart-roller-coaster)
2. [How to ride a minecart roller coaster?](#how-to-ride-a-minecart-roller-coaster)
3. [How to install?](#how-to-install)
4. [Block Help](#block-help)  
   a. [Track Segment Blocks](#track-segment-blocks)  
   b. [Track Customization Blocks](#track-customization-blocks)
5. [Sample Project](#sample-project)


## What is a Minecart Roller Coaster?
In Minecraft, the player has the ability to place **rails** and **powered rails** in the world. **Minecarts** can then be placed on top of rails and will follow the track that has been laid out. Powered rails, when activated with **redstone**, accelerate the minecart. Regular rails will simply guide it, but the cart will eventually slow down on them.

With this extension, you don't have to worry about the specifics of powering and unpowering rails - it handles all of that for you to ensure your roller coaster will never stop in its tracks (unless you want it to)! It will also ensure the roller coaster has enough vertical space to fit the player and will even protect the coaster from water and lava!

## How to ride a Minecart Roller Coaster?
Once you've created a minecart roller coaster, you're free to ride it! The track should automatically have a minecart at the starting zone, but if you've already ridden it once (or destroyed the minecart) you can always place a new one on the track by adding a minecart to your hotbar, selecting it, and right clicking on the track. Once the minecart is in place, right click to enter it. Then press (right click) the blue button on the pink wall to activate your minecart and begin the ride!

![StartingTheRollerCoaster](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/b97725fe-b931-41f8-bebb-991267f04e49)

## How to install?
To begin, start a new project in Microsoft MakeCode for Minecraft Education and select the **Extensions** button in the toolbox.
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/832a523e-c757-4f6f-b170-87460501ef13)

Then select the Roller Coaster Builder extension from the list of recommended options:
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/20b7cb09-9bbc-410e-8de5-00484d96f14a)

Now find the Roller Coaster category in your toolbox (postition may vary):  
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/7201a798-e6c8-4847-9ad3-61484b956d16)

## Block Help
To build your minecart roller coaster using this extension, you will construct your track segment-by-segment using code. All tracks should start with a [Begin Track](#begin-track) block, then you can append any number of segments, then finish the track with a [Place Track End](#place-track-end) block. You can also use code to customize certain elements of the track, like the [base block](#set-base-block) and [power interval](#set-normal-power-interval).

### Track Segment Blocks
These blocks are used to construct the track. Each block adds the specified segment, picking up where the previous block left off.

#### Begin Track
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/053be3ac-3431-48d5-a4f4-2d0423d19889)

This block constructs a starting zone for your roller coaster, including a small backing wall, a minecart, and a "launch button". All tracks should start with this block.

#### Place Track End
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/ee2a813e-8a54-4167-bf31-2a19075687a7)

This block places a final stopping area for your roller coaster, which will bring the minecart to a halt.

#### Add Straight Line
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/cd0153bc-fc60-43a8-a67a-4f48f957536c)  
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/3300ae2b-9eef-430b-8ab5-8dce62e04c3c)

This adds a straight line of the specified length to your roller coaster. If you expand the block, you can select a power level for the segment:
- **Full** power will ensure every rail in the segment is powered, making your roller coaster accelerate.
- **Normal** power will place powered rails at a fixed interval (see [Set Normal Power Interval](#set-normal-power-interval)). Your coaster will maintain a steady pace.
- **No** power means no powered rails will be added. This will cause the roller coaster to slow down. Caution: if the segment is long enough, the coaster could stop completely!

#### Add Ramp
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/482bfb2d-cc03-48b7-84d7-3f11406971ff)  
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/7b72d37c-2cf2-4f49-9d7d-cfd0c72b80a3)

This adds a ramp **up** or **down** to your roller coaster. By default, it will slope 1 block up/down for every 1 block forward, but if you expand the block, you may specify a more gradual slope by increasing the number of blocks moved forward for every 1 block moved vertically.

#### Add Turn
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/2ec3578e-19d2-483e-b474-196ac442cc67)

This adds a 90 degree turn to your roller coaster in the specified direction.

#### Add Spiral
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/b9edd431-a876-4834-b204-1bd7d5d89e70)

This adds a corkscrew-like spiral to your roller coaster, turning in circles while moving up or down. The width specifies how large the circles will be while the height specifies how far up or down the corkscrew will go.

#### Add Free Fall
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/3aad048f-9b44-4502-94e5-217d84906ff1)

This adds a drop in your roller coaster, where the minecart will free-fall the specified distance and land on a rail at the base of the fall. The track resumes from there.

#### Add Single Powered Rail
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/911f5db0-1aa7-4a67-8376-243edd8d2f5f)

This adds a single powered rail to your track. Powered rails cause the minecart to accelerate.

#### Add Single Rail
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/67449647-f7ab-4e42-accf-e403bbfefbb8)

This adds a single non-powered rail to your track.

### Track Customization Blocks
These blocks allow you to change features of your track, like the base block and power interval. They will only apply to track segments added after the block runs. They do not apply retroactively.

#### Set Base Block
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/819068eb-b003-436b-b55c-50abf9efae71)

This defines the block that will go beneath all of your rails.

#### Set Normal Power Interval
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/1f38bb6b-0a5b-4411-8645-3a4eccf3a0e4)

This block defines how often a *powered rail* is inserted into your track. A smaller interval means you will have powered rails more often, making your roller coaster faster.

#### Water and Lava Protection
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/465446b7-0067-4efc-86e5-2d3676fd521c)
![image](https://github.com/microsoft/makecode-minecraft-roller-coaster/assets/69657545/77babe3a-3147-4355-9a1b-d02a3144ba9d)

These blocks enable or disable the glass barrier that gets constructed when your track goes into water or lava. If the protection is disabled, water and lava may destroy your track, but the build will complete faster.

## Other

### Sample Project
To view a sample roller coaster project, import this URL: 

#### Metadata (used for search, rendering)

* for PXT/minecraft
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
