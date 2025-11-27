//TASK 1

async function async1() {
    console.log("async1 start");
    async2().then(() => {
        console.log("async1 end");
    });
}

function async2() {
    return new Promise((resolve) => {
        resolve();
        console.log("async2");
    });
}

function* generate() { 
    console.log("generate-1");
    yield;
    console.log("generate-1.2"); 
}

function* generate2() {
    console.log("generate-2");
    yield;
    console.log("generate-2.2");
}

console.log("script start");

setTimeout(function () {
    console.log("setTimeout");
}, 0);

const generator1 = generate();

async1();

const generator2 = generate2();

process.nextTick(() => {
    setTimeout(() => { 
        console.log("some timer 1");
    }, 0);
    console.log("next tick 1");
    setTimeout(() => {
        console.log("some timer 2");
        generator1.next();
    }, 0);
});

queueMicrotask(() => {
    console.log("microtask 1");
    setTimeout(() => {
        console.log("some timer 3");
    }, 0);
});

queueMicrotask(() => {
    console.log("microtask 2");
    setImmediate(() => {
        new Promise(function (resolve) {
            console.log("promise1");
            generator1.next();
            resolve();
        }).then(function () {
            console.log("promise2");
        });
    });
});

generator2.next();

setImmediate(() => {
    process.nextTick(() => {
        generator2.next();
    });
});

console.log("script end");

