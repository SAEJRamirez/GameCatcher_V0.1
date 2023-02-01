export function collision({object1, object2}) {
    return (
        object1.position.y + object1.height >= object2.position.y &&
        object1.position.y <= object2.position.y + object2.height &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x
    )
}

export function objectDownCollision({object1, object2}) {
    return (
        object1.position.y + object1.height >= object2.position.y + object2.adjustPosition &&
        object1.position.y + object1.height <= object2.position.y + object2.height + object2.adjustPosition &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x
    )
}

export function objectUpCollision({object1, object2}) {
    return (
        object1.position.y + object1.height >= object2.position.y  &&
        object1.position.y + object1.height <= object2.position.y + object2.height &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x
    )
}

export function collisionSidesEnemy({object1, object2}) {
    return (
        object1.position.x + object1.width >= object2.position.x &&
        object1.position.y + object1.height >= object2.position.y &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.y <= object2.position.y + object2.height
    )
}