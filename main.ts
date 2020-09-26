radio.onReceivedNumber(function (receivedNumber) {
    pins.digitalWritePin(DigitalPin.P1, receivedNumber)
})
input.onButtonPressed(Button.B, function () {
    temp = MLX90614.temperature(TemperatureLocation.Object)
    Ftemp = 40 + temp * 1.8
    basic.showNumber(Ftemp)
    basic.showString("Adding 10")
    Ftemp = 10 + Ftemp
    basic.showNumber(Ftemp)
    if (Ftemp <= 99) {
        music.playTone(294, music.beat(BeatFraction.Whole))
        basic.showIcon(IconNames.Happy)
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.pause(5000)
        pins.digitalWritePin(DigitalPin.P2, 0)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else {
        radio.sendNumber(Ftemp)
        music.playTone(784, music.beat(BeatFraction.Breve))
        basic.showIcon(IconNames.Sad)
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(5000)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
})
let ObjFound = 0
let Ftemp = 0
let temp = 0
basic.showString("Scanner")
radio.setGroup(113)
basic.forever(function () {
    ObjFound = pins.digitalReadPin(DigitalPin.P0)
    if (ObjFound == 1) {
        basic.pause(1000)
        temp = MLX90614.temperature(TemperatureLocation.Object)
        Ftemp = 32 + temp * 1.8
        basic.showNumber(Ftemp)
        if (Ftemp <= 99) {
            music.playTone(294, music.beat(BeatFraction.Whole))
            basic.showIcon(IconNames.Happy)
            pins.digitalWritePin(DigitalPin.P2, 1)
            basic.pause(5000)
            pins.digitalWritePin(DigitalPin.P2, 0)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        } else {
            radio.sendNumber(Ftemp)
            music.playTone(784, music.beat(BeatFraction.Breve))
            basic.showIcon(IconNames.Sad)
            pins.digitalWritePin(DigitalPin.P1, 1)
            basic.pause(5000)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        }
    } else {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
})
