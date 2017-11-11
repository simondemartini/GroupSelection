var DEFAULT_PARAMS = {
    maxBreed: 4,
    maxShare: 4,
    mutStep: 32,
    mutRate: 0.05,
    publicGoods: 2,
    sharePercentModifier: 0.1,
    breedClosest: true,
    shareWithSelfish: false,
    uniformForage: false,
    mutateRanges: false,

    popDenominator: 400,
    popMin: 400,
    popMultiplier: 0.1,
    popStart: 100,

    graphDays: 200,
    viewAgentSize: 24,
    viewCountX: 30,
    viewCountY: 30,
    clockStep: 0.1,
    skipClock: true,

    maxDays: 5000,
    runName: "gs-default",
    sendToDB: true,
    download: true,
    sampleDays: 50,
    storeAll: false,

    pause: false
}

function ExperimentManager() {
    this.run = 0;
    this.maxRuns = 8; //max runs per test
    this.currentTest = 0;
    this.dataGroup = "TEST-GROUP2";

    //copy the default as test base for each test to run
    var tests = [];
    for(var i = 0; i < 13; i++) {
        tests.push(Object.assign({}, DEFAULT_PARAMS));
    }

    var num = 0;
    //test[0] is default

    num++;
    tests[num].runName = "step8"
    tests[num].mutStep = 8;

    num++;
    tests[num].runName = "step4"
    tests[num].mutStep = 4;

    num++;
    tests[num].runName = "share16"
    tests[num].maxShare = 16;

    num++;
    tests[num].runName = "breed16"
    tests[num].maxBreed = 16;

    num++;
    tests[num].runName = "breedShare16"
    tests[num].maxBreed = 16;
    tests[num].maxShare = 16;

    num++;
    tests[num].runName = "shareSelfish"
    tests[num].shareWithSelfish = true;

    num++;
    tests[num].runName = "uniformForage"
    tests[num].uniformForage = true;

    num++;
    tests[num].runName = "breedRandom"
    tests[num].breedClosest = false;

    num++;
    tests[num].runName = "publicGoods125"
    tests[num].publicGoods = 1.25;

    num++;
    tests[num].runName = "publicGoods150"
    tests[num].publicGoods = 1.5;

    num++;
    tests[num].runName = "publicGoods175"
    tests[num].publicGoods = 1.75;

    num++;
    tests[num].runName = "mutateBreedShare"
    tests[num].mutateRanges = true;

    //keep tests as an empty array if you want to play around with settings in UI
    this.tests = tests;
    this.updateUI(DEFAULT_PARAMS);

}

ExperimentManager.prototype.nextParams = function () {
    var newParams;
    if(this.tests.length == 0) {
        newParams = this.getFromUI();
    } else {
        this.currentTest = this.run % this.tests.length;
        newParams = this.tests[this.currentTest];

        if(this.run > (this.maxRuns * this.tests.length) - 1 ) {
            newParams.pause = true;
        }
    }

    this.run++;
    this.updateUI(newParams);
    return newParams;
};

ExperimentManager.prototype.nextPopId = function () {
    var id = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        id += possible.charAt(Math.floor(Math.random() * possible.length));

    document.getElementById('popId').value = id;
    return id;
};

ExperimentManager.prototype.getFromUI = function () {
    var params = {
        mutRate: parseFloat(document.getElementById('mutRate').value),
        mutStep:  parseInt(document.getElementById('mutStep').value),
        viewCountX: parseInt(document.getElementById('viewCountX').value),
        viewCountY: parseInt(document.getElementById('viewCountY').value),
        viewAgentSize: parseInt(document.getElementById('viewAgentSize').value),
        maxBreed: parseInt(document.getElementById('maxBreed').value),
        maxShare: parseInt(document.getElementById('maxShare').value),
        publicGoods: parseFloat(document.getElementById('publicGoods').value),
        sharePercentModifier: parseFloat(document.getElementById('sharePercentModifier').value),
        popStart: parseInt(document.getElementById('popStart').value),
        popMin: parseInt(document.getElementById('popMin').value),
        popMultiplier: parseFloat(document.getElementById('popMultiplier').value),
        popDenominator: parseInt(document.getElementById('popDenominator').value),
        skipClock: document.getElementById('skipClock').checked,
        clockStep: parseFloat(document.getElementById('clockStep').value),
        breedClosest: document.getElementById('breedClosest').checked,
        shareWithSelfish: document.getElementById('shareWithSelfish').checked,
        mutateRanges: document.getElementById('mutateRanges').checked,
        maxDays: parseInt(document.getElementById('maxDays').value),
        graphDays: parseInt(document.getElementById('graphDays').value),
        uniformForage: document.getElementById('uniformForage').checked,
        runName: document.getElementById('runName').value,
        sampleDays: parseInt(document.getElementById('sampleDays').value),
        download: document.getElementById('download').checked,
        storeAll: document.getElementById('storeAll').checked,
        sendToDB: document.getElementById('sendToDB').checked,
        pause: false
    };

    return params;
};

ExperimentManager.prototype.updateUI = function (p) {
    var disableControls = this.tests.length;
    document.getElementById("tests").innerHTML = "Test: " + (this.currentTest + 1) + "/" + this.tests.length;
    document.getElementById("runs").innerHTML = "Run: " + this.run + "/" + (this.tests.length * this.maxRuns);

    Object.keys(p).forEach(function(key,index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        var element = document.getElementById(key);
        if(element) {
            if(element.type == "checkbox") {
                element.checked = p[key];
            } else {
                element.value = p[key];
            }
            element.disabled = disableControls;
        }
    });
}
