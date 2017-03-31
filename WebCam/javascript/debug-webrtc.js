function Report() {
    this.output_ = [], this.nextAsyncId_ = 0, this.nativeLog_ = console.log.bind(console), console.log = this.logHook_.bind(this), window.addEventListener("error", this.onWindowError_.bind(this)), this.traceEventInstant("system-info", Report.getSystemInfo())
}

function runAllSequentially(a, b) {
    function c() {
        return d++, d === a.length ? void b() : void a[d].run(e)
    }
    var d = -1,
        e = setTimeout.bind(null, c);
    e()
}

function createLineChart() {
    return currentTest.createLineChart()
}

function reportSuccess(a) {
    currentTest.reportSuccess(a)
}

function reportError(a) {
    currentTest.reportError(a)
}

function reportFatal(a) {
    currentTest.reportFatal(a)
}

function reportWarning(a) {
    currentTest.reportWarning(a)
}

function reportInfo(a) {
    currentTest.reportInfo(a)
}

function setTestProgress(a) {
    currentTest.setProgress(a)
}

function setTestFinished() {
    currentTest.done()
}

function expectEquals() {
    currentTest.expectEquals.apply(currentTest, arguments)
}

function setTimeoutWithProgressBar(a, b) {
    var c = window.performance.now(),
        d = setInterval(function() {
            var a = window.performance.now();
            setTestProgress(100 * (a - c) / b)
        }, 100),
        e = function() {
            clearInterval(d), setTestProgress(100), a()
        },
        f = setTimeout(e, b),
        g = function() {
            clearTimeout(f), e()
        };
    return g
}

function parseUrlParameters() {
    var a = {};
    if ("" !== window.location.search)
        for (var b = window.location.search.replace(/\//g, "").substr(1).split("&"), c = 0; c !== b.length; ++c) {
            var d = b[c].split("=");
            a[decodeURIComponent(d[0])] = decodeURIComponent(d[1])
        }
    return a
}

function addTest(a, b, c) {
    if (!isTestDisabled(b)) {
        for (var d = 0; d !== enumeratedTestSuites.length; ++d)
            if (enumeratedTestSuites[d].name === a) return void enumeratedTestSuites[d].addTest(b, c);
        var e = document.createElement("testrtc-suite");
        e.name = a, e.addTest(b, c), enumeratedTestSuites.push(e), document.getElementById("content").appendChild(e)
    }
}

function addExplicitTest(a, b, c) {
    isTestExplicitlyEnabled(b) && addTest(a, b, c)
}

function isTestDisabled(a) {
    return 0 === enumeratedTestFilters.length ? !1 : !isTestExplicitlyEnabled(a)
}

function isTestExplicitlyEnabled(a) {
    for (var b = 0; b !== enumeratedTestFilters.length; ++b)
        if (enumeratedTestFilters[b] === a) return !0;
    return !1
}

function Call(a, b) {
    this.test = b, this.traceEvent = report.traceEventAsync("call"), this.traceEvent({
        config: a
    }), this.statsGatheringRunning = !1, this.pc1 = new RTCPeerConnection(a), this.pc2 = new RTCPeerConnection(a), this.pc1.addEventListener("icecandidate", this.onIceCandidate_.bind(this, this.pc2)), this.pc2.addEventListener("icecandidate", this.onIceCandidate_.bind(this, this.pc1)), this.iceCandidateFilter_ = Call.noFilter
}

function StatisticsAggregate(a) {
    this.startTime_ = 0, this.sum_ = 0, this.count_ = 0, this.max_ = 0, this.rampUpThreshold_ = a, this.rampUpTime_ = 1 / 0
}

function Ssim() {}

function arrayAverage(a) {
    for (var b = a.length, c = 0, d = 0; b > d; d++) c += a[d];
    return Math.floor(c / b)
}

function arrayMax(a) {
    return 0 === a.length ? NaN : Math.max.apply(Math, a)
}

function arrayMin(a) {
    return 0 === a.length ? NaN : Math.min.apply(Math, a)
}

function TestCaseNames() {
    return this.testCases = {
        AUDIOCAPTURE: "Audio capture",
        CHECKRESOLUTION240: "Check resolution 320x240",
        CHECKRESOLUTION480: "Check resolution 640x480",
        CHECKRESOLUTION720: "Check resolution 1280x720",
        CHECKSUPPORTEDRESOLUTIONS: "Check supported resolutions",
        DATATHROUGHPUT: "Data throughput",
        IPV6ENABLED: "Ipv6 enabled",
        NETWORKLATENCY: "Network latency",
        NETWORKLATENCYRELAY: "Network latency - Relay",
        UDPENABLED: "Udp enabled",
        TCPENABLED: "Tcp enabled",
        VIDEOBANDWIDTH: "Video bandwidth",
        RELAYCONNECTIVITY: "Relay connectivity",
        REFLEXIVECONNECTIVITY: "Reflexive connectivity",
        HOSTCONNECTIVITY: "Host connectivity"
    }, this.testCases
}

function TestSuiteNames() {
    return this.testSuites = {
        CAMERA: "Camera",
        MICROPHONE: "Microphone",
        NETWORK: "Network",
        CONNECTIVITY: "Connectivity",
        THROUGHPUT: "Throughput"
    }, this.testSuites
}

function MicTest(a) {
    this.test = a, this.inputChannelCount = 6, this.outputChannelCount = 2, this.bufferSize = 0, this.constraints = {
        audio: {
            optional: [{
                echoCancellation: !1
            }]
        }
    }, this.collectSeconds = 2, this.silentThreshold = 1 / 32767, this.lowVolumeThreshold = -60, this.monoDetectThreshold = 1 / 65536, this.clipCountThreshold = 6, this.clipThreshold = 1, this.collectedAudio = [], this.collectedSampleCount = 0;
    for (var b = 0; b < this.inputChannelCount; ++b) this.collectedAudio[b] = []
}

function CamResolutionsTest(a, b) {
    this.test = a, this.resolutions = b, this.currentResolution = 0, this.isMuted = !1, this.isShuttingDown = !1
}

function VideoFrameChecker(a) {
    this.frameStats = {
        numFrozenFrames: 0,
        numBlackFrames: 0,
        numFrames: 0
    }, this.running_ = !0, this.nonBlackPixelLumaThreshold = 20, this.previousFrame_ = [], this.identicalFrameSsimThreshold = .985, this.frameComparator = new Ssim, this.canvas_ = document.createElement("canvas"), this.videoElement_ = a, this.listener_ = this.checkVideoFrame_.bind(this), this.videoElement_.addEventListener("play", this.listener_, !1)
}

function RunConnectivityTest(a, b) {
    this.test = a, this.iceCandidateFilter = b, this.timeout = null, this.parsedCandidates = [], this.call = null
}

function DataChannelThroughputTest(a) {
    this.test = a, this.testDurationSeconds = 5, this.startTime = null, this.sentPayloadBytes = 0, this.receivedPayloadBytes = 0, this.stopSending = !1, this.samplePacket = "";
    for (var b = 0; 1024 !== b; ++b) this.samplePacket += "h";
    this.maxNumberOfPacketsToSend = 1, this.bytesToKeepBuffered = 1024 * this.maxNumberOfPacketsToSend, this.lastBitrateMeasureTime = null, this.lastReceivedPayloadBytes = 0, this.call = null, this.senderChannel = null, this.receiveChannel = null
}

function VideoBandwidthTest(a) {
    this.test = a, this.maxVideoBitrateKbps = 2e3, this.durationMs = 4e4, this.statStepMs = 100, this.bweStats = new StatisticsAggregate(.75 * this.maxVideoBitrateKbps * 1e3), this.rttStats = new StatisticsAggregate, this.packetsLost = null, this.videoStats = [], this.startTime = null, this.call = null, this.constraints = {
        audio: !1,
        video: {
            optional: [{
                minWidth: 1280
            }, {
                minHeight: 720
            }]
        }
    }
}

function WiFiPeriodicScanTest(a, b) {
    this.test = a, this.candidateFilter = b, this.testDurationMs = 3e5, this.sendIntervalMs = 100, this.delays = [], this.recvTimeStamps = [], this.running = !1, this.call = null, this.senderChannel = null, this.receiveChannel = null
}! function(a, b, c, d, e, f, g) {
    a.GoogleAnalyticsObject = e, a[e] = a[e] || function() {
        (a[e].q = a[e].q || []).push(arguments)
    }, a[e].l = 1 * new Date, f = b.createElement(c), g = b.getElementsByTagName(c)[0], f.async = 1, f.src = d, g.parentNode.insertBefore(f, g)
}(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-48530561-3", "auto"), ga("send", "pageview"),
    function(a) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
        else if ("function" == typeof define && define.amd) define([], a);
        else {
            var b;
            b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.adapter = a()
        }
    }(function() {
        return function a(b, c, d) {
            function e(g, h) {
                if (!c[g]) {
                    if (!b[g]) {
                        var i = "function" == typeof require && require;
                        if (!h && i) return i(g, !0);
                        if (f) return f(g, !0);
                        var j = new Error("Cannot find module '" + g + "'");
                        throw j.code = "MODULE_NOT_FOUND", j
                    }
                    var k = c[g] = {
                        exports: {}
                    };
                    b[g][0].call(k.exports, function(a) {
                        var c = b[g][1][a];
                        return e(c ? c : a)
                    }, k, k.exports, a, b, c, d)
                }
                return c[g].exports
            }
            for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
            return e
        }({
            1: [function(a, b, c) {
                "use strict";
                var d = {};
                d.generateIdentifier = function() {
                    return Math.random().toString(36).substr(2, 10)
                }, d.localCName = d.generateIdentifier(), d.splitLines = function(a) {
                    return a.trim().split("\n").map(function(a) {
                        return a.trim()
                    })
                }, d.splitSections = function(a) {
                    var b = a.split("\nm=");
                    return b.map(function(a, b) {
                        return (b > 0 ? "m=" + a : a).trim() + "\r\n"
                    })
                }, d.matchPrefix = function(a, b) {
                    return d.splitLines(a).filter(function(a) {
                        return 0 === a.indexOf(b)
                    })
                }, d.parseCandidate = function(a) {
                    var b;
                    b = 0 === a.indexOf("a=candidate:") ? a.substring(12).split(" ") : a.substring(10).split(" ");
                    for (var c = {
                            foundation: b[0],
                            component: b[1],
                            protocol: b[2].toLowerCase(),
                            priority: parseInt(b[3], 10),
                            ip: b[4],
                            port: parseInt(b[5], 10),
                            type: b[7]
                        }, d = 8; d < b.length; d += 2) switch (b[d]) {
                        case "raddr":
                            c.relatedAddress = b[d + 1];
                            break;
                        case "rport":
                            c.relatedPort = parseInt(b[d + 1], 10);
                            break;
                        case "tcptype":
                            c.tcpType = b[d + 1]
                    }
                    return c
                }, d.writeCandidate = function(a) {
                    var b = [];
                    b.push(a.foundation), b.push(a.component), b.push(a.protocol.toUpperCase()), b.push(a.priority), b.push(a.ip), b.push(a.port);
                    var c = a.type;
                    return b.push("typ"), b.push(c), "host" !== c && a.relatedAddress && a.relatedPort && (b.push("raddr"), b.push(a.relatedAddress), b.push("rport"), b.push(a.relatedPort)), a.tcpType && "tcp" === a.protocol.toLowerCase() && (b.push("tcptype"), b.push(a.tcpType)), "candidate:" + b.join(" ")
                }, d.parseRtpMap = function(a) {
                    var b = a.substr(9).split(" "),
                        c = {
                            payloadType: parseInt(b.shift(), 10)
                        };
                    return b = b[0].split("/"), c.name = b[0], c.clockRate = parseInt(b[1], 10), c.numChannels = 3 === b.length ? parseInt(b[2], 10) : 1, c
                }, d.writeRtpMap = function(a) {
                    var b = a.payloadType;
                    return void 0 !== a.preferredPayloadType && (b = a.preferredPayloadType), "a=rtpmap:" + b + " " + a.name + "/" + a.clockRate + (1 !== a.numChannels ? "/" + a.numChannels : "") + "\r\n"
                }, d.parseExtmap = function(a) {
                    var b = a.substr(9).split(" ");
                    return {
                        id: parseInt(b[0], 10),
                        uri: b[1]
                    }
                }, d.writeExtmap = function(a) {
                    return "a=extmap:" + (a.id || a.preferredId) + " " + a.uri + "\r\n"
                }, d.parseFmtp = function(a) {
                    for (var b, c = {}, d = a.substr(a.indexOf(" ") + 1).split(";"), e = 0; e < d.length; e++) b = d[e].trim().split("="), c[b[0].trim()] = b[1];
                    return c
                }, d.writeFmtp = function(a) {
                    var b = "",
                        c = a.payloadType;
                    if (void 0 !== a.preferredPayloadType && (c = a.preferredPayloadType), a.parameters && Object.keys(a.parameters).length) {
                        var d = [];
                        Object.keys(a.parameters).forEach(function(b) {
                            d.push(b + "=" + a.parameters[b])
                        }), b += "a=fmtp:" + c + " " + d.join(";") + "\r\n"
                    }
                    return b
                }, d.parseRtcpFb = function(a) {
                    var b = a.substr(a.indexOf(" ") + 1).split(" ");
                    return {
                        type: b.shift(),
                        parameter: b.join(" ")
                    }
                }, d.writeRtcpFb = function(a) {
                    var b = "",
                        c = a.payloadType;
                    return void 0 !== a.preferredPayloadType && (c = a.preferredPayloadType), a.rtcpFeedback && a.rtcpFeedback.length && a.rtcpFeedback.forEach(function(a) {
                        b += "a=rtcp-fb:" + c + " " + a.type + (a.parameter && a.parameter.length ? " " + a.parameter : "") + "\r\n"
                    }), b
                }, d.parseSsrcMedia = function(a) {
                    var b = a.indexOf(" "),
                        c = {
                            ssrc: parseInt(a.substr(7, b - 7), 10)
                        },
                        d = a.indexOf(":", b);
                    return d > -1 ? (c.attribute = a.substr(b + 1, d - b - 1), c.value = a.substr(d + 1)) : c.attribute = a.substr(b + 1), c
                }, d.getDtlsParameters = function(a, b) {
                    var c = d.splitLines(a);
                    c = c.concat(d.splitLines(b));
                    var e = c.filter(function(a) {
                            return 0 === a.indexOf("a=fingerprint:")
                        })[0].substr(14),
                        f = {
                            role: "auto",
                            fingerprints: [{
                                algorithm: e.split(" ")[0],
                                value: e.split(" ")[1]
                            }]
                        };
                    return f
                }, d.writeDtlsParameters = function(a, b) {
                    var c = "a=setup:" + b + "\r\n";
                    return a.fingerprints.forEach(function(a) {
                        c += "a=fingerprint:" + a.algorithm + " " + a.value + "\r\n"
                    }), c
                }, d.getIceParameters = function(a, b) {
                    var c = d.splitLines(a);
                    c = c.concat(d.splitLines(b));
                    var e = {
                        usernameFragment: c.filter(function(a) {
                            return 0 === a.indexOf("a=ice-ufrag:")
                        })[0].substr(12),
                        password: c.filter(function(a) {
                            return 0 === a.indexOf("a=ice-pwd:")
                        })[0].substr(10)
                    };
                    return e
                }, d.writeIceParameters = function(a) {
                    return "a=ice-ufrag:" + a.usernameFragment + "\r\na=ice-pwd:" + a.password + "\r\n"
                }, d.parseRtpParameters = function(a) {
                    for (var b = {
                            codecs: [],
                            headerExtensions: [],
                            fecMechanisms: [],
                            rtcp: []
                        }, c = d.splitLines(a), e = c[0].split(" "), f = 3; f < e.length; f++) {
                        var g = e[f],
                            h = d.matchPrefix(a, "a=rtpmap:" + g + " ")[0];
                        if (h) {
                            var i = d.parseRtpMap(h),
                                j = d.matchPrefix(a, "a=fmtp:" + g + " ");
                            switch (i.parameters = j.length ? d.parseFmtp(j[0]) : {}, i.rtcpFeedback = d.matchPrefix(a, "a=rtcp-fb:" + g + " ").map(d.parseRtcpFb), b.codecs.push(i), i.name.toUpperCase()) {
                                case "RED":
                                case "ULPFEC":
                                    b.fecMechanisms.push(i.name.toUpperCase())
                            }
                        }
                    }
                    return d.matchPrefix(a, "a=extmap:").forEach(function(a) {
                        b.headerExtensions.push(d.parseExtmap(a))
                    }), b
                }, d.writeRtpDescription = function(a, b) {
                    var c = "";
                    return c += "m=" + a + " ", c += b.codecs.length > 0 ? "9" : "0", c += " UDP/TLS/RTP/SAVPF ", c += b.codecs.map(function(a) {
                        return void 0 !== a.preferredPayloadType ? a.preferredPayloadType : a.payloadType
                    }).join(" ") + "\r\n", c += "c=IN IP4 0.0.0.0\r\n", c += "a=rtcp:9 IN IP4 0.0.0.0\r\n", b.codecs.forEach(function(a) {
                        c += d.writeRtpMap(a), c += d.writeFmtp(a), c += d.writeRtcpFb(a)
                    }), c += "a=rtcp-mux\r\n"
                }, d.parseRtpEncodingParameters = function(a) {
                    var b, c = [],
                        e = d.parseRtpParameters(a),
                        f = -1 !== e.fecMechanisms.indexOf("RED"),
                        g = -1 !== e.fecMechanisms.indexOf("ULPFEC"),
                        h = d.matchPrefix(a, "a=ssrc:").map(function(a) {
                            return d.parseSsrcMedia(a)
                        }).filter(function(a) {
                            return "cname" === a.attribute
                        }),
                        i = h.length > 0 && h[0].ssrc,
                        j = d.matchPrefix(a, "a=ssrc-group:FID").map(function(a) {
                            var b = a.split(" ");
                            return b.shift(), b.map(function(a) {
                                return parseInt(a, 10)
                            })
                        });
                    j.length > 0 && j[0].length > 1 && j[0][0] === i && (b = j[0][1]), e.codecs.forEach(function(a) {
                        if ("RTX" === a.name.toUpperCase() && a.parameters.apt) {
                            var d = {
                                ssrc: i,
                                codecPayloadType: parseInt(a.parameters.apt, 10),
                                rtx: {
                                    payloadType: a.payloadType,
                                    ssrc: b
                                }
                            };
                            c.push(d), f && (d = JSON.parse(JSON.stringify(d)), d.fec = {
                                ssrc: b,
                                mechanism: g ? "red+ulpfec" : "red"
                            }, c.push(d))
                        }
                    }), 0 === c.length && i && c.push({
                        ssrc: i
                    });
                    var k = d.matchPrefix(a, "b=");
                    return k.length && (0 === k[0].indexOf("b=TIAS:") ? k = parseInt(k[0].substr(7), 10) : 0 === k[0].indexOf("b=AS:") && (k = parseInt(k[0].substr(5), 10)), c.forEach(function(a) {
                        a.maxBitrate = k
                    })), c
                }, d.writeSessionBoilerplate = function() {
                    return "v=0\r\no=thisisadapterortc 8169639915646943137 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
                }, d.writeMediaSection = function(a, b, c, e) {
                    var f = d.writeRtpDescription(a.kind, b);
                    if (f += d.writeIceParameters(a.iceGatherer.getLocalParameters()), f += d.writeDtlsParameters(a.dtlsTransport.getLocalParameters(), "offer" === c ? "actpass" : "active"), f += "a=mid:" + a.mid + "\r\n", f += a.rtpSender && a.rtpReceiver ? "a=sendrecv\r\n" : a.rtpSender ? "a=sendonly\r\n" : a.rtpReceiver ? "a=recvonly\r\n" : "a=inactive\r\n", a.rtpSender) {
                        var g = "msid:" + e.id + " " + a.rtpSender.track.id + "\r\n";
                        f += "a=" + g, f += "a=ssrc:" + a.sendEncodingParameters[0].ssrc + " " + g
                    }
                    return f += "a=ssrc:" + a.sendEncodingParameters[0].ssrc + " cname:" + d.localCName + "\r\n"
                }, d.getDirection = function(a, b) {
                    for (var c = d.splitLines(a), e = 0; e < c.length; e++) switch (c[e]) {
                        case "a=sendrecv":
                        case "a=sendonly":
                        case "a=recvonly":
                        case "a=inactive":
                            return c[e].substr(2)
                    }
                    return b ? d.getDirection(b) : "sendrecv"
                }, b.exports = d
            }, {}],
            2: [function(a, b, c) {
                "use strict";
                ! function() {
                    var c = a("./utils").log,
                        d = a("./utils").browserDetails;
                    b.exports.browserDetails = d, b.exports.extractVersion = a("./utils").extractVersion, b.exports.disableLog = a("./utils").disableLog;
                    var e = a("./chrome/chrome_shim") || null,
                        f = a("./edge/edge_shim") || null,
                        g = a("./firefox/firefox_shim") || null,
                        h = a("./safari/safari_shim") || null;
                    switch (d.browser) {
                        case "opera":
                        case "chrome":
                            if (!e || !e.shimPeerConnection) return void c("Chrome shim is not included in this adapter release.");
                            c("adapter.js shimming chrome."), b.exports.browserShim = e, e.shimGetUserMedia(), e.shimMediaStream(), e.shimSourceObject(), e.shimPeerConnection(), e.shimOnTrack();
                            break;
                        case "firefox":
                            if (!g || !g.shimPeerConnection) return void c("Firefox shim is not included in this adapter release.");
                            c("adapter.js shimming firefox."), b.exports.browserShim = g, g.shimGetUserMedia(), g.shimSourceObject(), g.shimPeerConnection(), g.shimOnTrack();
                            break;
                        case "edge":
                            if (!f || !f.shimPeerConnection) return void c("MS edge shim is not included in this adapter release.");
                            c("adapter.js shimming edge."), b.exports.browserShim = f, f.shimGetUserMedia(), f.shimPeerConnection();
                            break;
                        case "safari":
                            if (!h) return void c("Safari shim is not included in this adapter release.");
                            c("adapter.js shimming safari."), b.exports.browserShim = h, h.shimGetUserMedia();
                            break;
                        default:
                            c("Unsupported browser!")
                    }
                }()
            }, {
                "./chrome/chrome_shim": 3,
                "./edge/edge_shim": 5,
                "./firefox/firefox_shim": 7,
                "./safari/safari_shim": 9,
                "./utils": 10
            }],
            3: [function(a, b, c) {
                "use strict";
                var d = a("../utils.js").log,
                    e = a("../utils.js").browserDetails,
                    f = {
                        shimMediaStream: function() {
                            window.MediaStream = window.MediaStream || window.webkitMediaStream
                        },
                        shimOnTrack: function() {
                            "object" != typeof window || !window.RTCPeerConnection || "ontrack" in window.RTCPeerConnection.prototype || Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", {
                                get: function() {
                                    return this._ontrack
                                },
                                set: function(a) {
                                    var b = this;
                                    this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = a), this.addEventListener("addstream", this._ontrackpoly = function(a) {
                                        a.stream.addEventListener("addtrack", function(c) {
                                            var d = new Event("track");
                                            d.track = c.track, d.receiver = {
                                                track: c.track
                                            }, d.streams = [a.stream], b.dispatchEvent(d)
                                        }), a.stream.getTracks().forEach(function(b) {
                                            var c = new Event("track");
                                            c.track = b, c.receiver = {
                                                track: b
                                            }, c.streams = [a.stream], this.dispatchEvent(c)
                                        }.bind(this))
                                    }.bind(this))
                                }
                            })
                        },
                        shimSourceObject: function() {
                            "object" == typeof window && (!window.HTMLMediaElement || "srcObject" in window.HTMLMediaElement.prototype || Object.defineProperty(window.HTMLMediaElement.prototype, "srcObject", {
                                get: function() {
                                    return this._srcObject
                                },
                                set: function(a) {
                                    var b = this;
                                    return this._srcObject = a, this.src && URL.revokeObjectURL(this.src), a ? (this.src = URL.createObjectURL(a), a.addEventListener("addtrack", function() {
                                        b.src && URL.revokeObjectURL(b.src), b.src = URL.createObjectURL(a)
                                    }), void a.addEventListener("removetrack", function() {
                                        b.src && URL.revokeObjectURL(b.src), b.src = URL.createObjectURL(a)
                                    })) : void(this.src = "")
                                }
                            }))
                        },
                        shimPeerConnection: function() {
                            window.RTCPeerConnection = function(a, b) {
                                d("PeerConnection"), a && a.iceTransportPolicy && (a.iceTransports = a.iceTransportPolicy);
                                var c = new webkitRTCPeerConnection(a, b),
                                    e = c.getStats.bind(c);
                                return c.getStats = function(a, b, c) {
                                    var d = this,
                                        f = arguments;
                                    if (arguments.length > 0 && "function" == typeof a) return e(a, b);
                                    var g = function(a) {
                                            var b = {},
                                                c = a.result();
                                            return c.forEach(function(a) {
                                                var c = {
                                                    id: a.id,
                                                    timestamp: a.timestamp,
                                                    type: a.type
                                                };
                                                a.names().forEach(function(b) {
                                                    c[b] = a.stat(b)
                                                }), b[c.id] = c
                                            }), b
                                        },
                                        h = function(a, b) {
                                            var c = new Map(Object.keys(a).map(function(b) {
                                                return [b, a[b]]
                                            }));
                                            return b = b || a, Object.keys(b).forEach(function(a) {
                                                c[a] = b[a]
                                            }), c
                                        };
                                    if (arguments.length >= 2) {
                                        var i = function(a) {
                                            f[1](h(g(a)))
                                        };
                                        return e.apply(this, [i, arguments[0]])
                                    }
                                    return new Promise(function(b, c) {
                                        1 === f.length && "object" == typeof a ? e.apply(d, [function(a) {
                                            b(h(g(a)))
                                        }, c]) : e.apply(d, [function(a) {
                                            b(h(g(a), a.result()))
                                        }, c])
                                    }).then(b, c)
                                }, c
                            }, window.RTCPeerConnection.prototype = webkitRTCPeerConnection.prototype, webkitRTCPeerConnection.generateCertificate && Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
                                get: function() {
                                    return webkitRTCPeerConnection.generateCertificate
                                }
                            }), ["createOffer", "createAnswer"].forEach(function(a) {
                                var b = webkitRTCPeerConnection.prototype[a];
                                webkitRTCPeerConnection.prototype[a] = function() {
                                    var a = this;
                                    if (arguments.length < 1 || 1 === arguments.length && "object" == typeof arguments[0]) {
                                        var c = 1 === arguments.length ? arguments[0] : void 0;
                                        return new Promise(function(d, e) {
                                            b.apply(a, [d, e, c])
                                        })
                                    }
                                    return b.apply(this, arguments)
                                }
                            }), e.version < 51 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(a) {
                                var b = webkitRTCPeerConnection.prototype[a];
                                webkitRTCPeerConnection.prototype[a] = function() {
                                    var a = arguments,
                                        c = this,
                                        d = new Promise(function(d, e) {
                                            b.apply(c, [a[0], d, e])
                                        });
                                    return a.length < 2 ? d : d.then(function() {
                                        a[1].apply(null, [])
                                    }, function(b) {
                                        a.length >= 3 && a[2].apply(null, [b])
                                    })
                                }
                            }), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(a) {
                                var b = webkitRTCPeerConnection.prototype[a];
                                webkitRTCPeerConnection.prototype[a] = function() {
                                    return arguments[0] = new("addIceCandidate" === a ? RTCIceCandidate : RTCSessionDescription)(arguments[0]), b.apply(this, arguments)
                                }
                            });
                            var a = RTCPeerConnection.prototype.addIceCandidate;
                            RTCPeerConnection.prototype.addIceCandidate = function() {
                                return arguments[0] ? a.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                            }
                        }
                    };
                b.exports = {
                    shimMediaStream: f.shimMediaStream,
                    shimOnTrack: f.shimOnTrack,
                    shimSourceObject: f.shimSourceObject,
                    shimPeerConnection: f.shimPeerConnection,
                    shimGetUserMedia: a("./getusermedia")
                }
            }, {
                "../utils.js": 10,
                "./getusermedia": 4
            }],
            4: [function(a, b, c) {
                "use strict";
                var d = a("../utils.js").log;
                b.exports = function() {
                    var a = function(a) {
                            if ("object" != typeof a || a.mandatory || a.optional) return a;
                            var b = {};
                            return Object.keys(a).forEach(function(c) {
                                if ("require" !== c && "advanced" !== c && "mediaSource" !== c) {
                                    var d = "object" == typeof a[c] ? a[c] : {
                                        ideal: a[c]
                                    };
                                    void 0 !== d.exact && "number" == typeof d.exact && (d.min = d.max = d.exact);
                                    var e = function(a, b) {
                                        return a ? a + b.charAt(0).toUpperCase() + b.slice(1) : "deviceId" === b ? "sourceId" : b
                                    };
                                    if (void 0 !== d.ideal) {
                                        b.optional = b.optional || [];
                                        var f = {};
                                        "number" == typeof d.ideal ? (f[e("min", c)] = d.ideal, b.optional.push(f), f = {}, f[e("max", c)] = d.ideal, b.optional.push(f)) : (f[e("", c)] = d.ideal, b.optional.push(f))
                                    }
                                    void 0 !== d.exact && "number" != typeof d.exact ? (b.mandatory = b.mandatory || {}, b.mandatory[e("", c)] = d.exact) : ["min", "max"].forEach(function(a) {
                                        void 0 !== d[a] && (b.mandatory = b.mandatory || {}, b.mandatory[e(a, c)] = d[a])
                                    })
                                }
                            }), a.advanced && (b.optional = (b.optional || []).concat(a.advanced)), b
                        },
                        b = function(b, c) {
                            if (b = JSON.parse(JSON.stringify(b)), b && b.audio && (b.audio = a(b.audio)), b && "object" == typeof b.video) {
                                var e = b.video.facingMode;
                                if (e = e && ("object" == typeof e ? e : {
                                        ideal: e
                                    }), e && ("user" === e.exact || "environment" === e.exact || "user" === e.ideal || "environment" === e.ideal) && (!navigator.mediaDevices.getSupportedConstraints || !navigator.mediaDevices.getSupportedConstraints().facingMode) && (delete b.video.facingMode, "environment" === e.exact || "environment" === e.ideal)) return navigator.mediaDevices.enumerateDevices().then(function(f) {
                                    f = f.filter(function(a) {
                                        return "videoinput" === a.kind
                                    });
                                    var g = f.find(function(a) {
                                        return -1 !== a.label.toLowerCase().indexOf("back")
                                    }) || f.length && f[f.length - 1];
                                    return g && (b.video.deviceId = e.exact ? {
                                        exact: g.deviceId
                                    } : {
                                        ideal: g.deviceId
                                    }), b.video = a(b.video), d("chrome: " + JSON.stringify(b)), c(b)
                                });
                                b.video = a(b.video)
                            }
                            return d("chrome: " + JSON.stringify(b)), c(b)
                        },
                        c = function(a) {
                            return {
                                name: {
                                    PermissionDeniedError: "NotAllowedError",
                                    ConstraintNotSatisfiedError: "OverconstrainedError"
                                }[a.name] || a.name,
                                message: a.message,
                                constraint: a.constraintName,
                                toString: function() {
                                    return this.name + (this.message && ": ") + this.message
                                }
                            }
                        },
                        e = function(a, d, e) {
                            b(a, function(a) {
                                navigator.webkitGetUserMedia(a, d, function(a) {
                                    e(c(a))
                                })
                            })
                        };
                    navigator.getUserMedia = e;
                    var f = function(a) {
                        return new Promise(function(b, c) {
                            navigator.getUserMedia(a, b, c)
                        })
                    };
                    if (navigator.mediaDevices || (navigator.mediaDevices = {
                            getUserMedia: f,
                            enumerateDevices: function() {
                                return new Promise(function(a) {
                                    var b = {
                                        audio: "audioinput",
                                        video: "videoinput"
                                    };
                                    return MediaStreamTrack.getSources(function(c) {
                                        a(c.map(function(a) {
                                            return {
                                                label: a.label,
                                                kind: b[a.kind],
                                                deviceId: a.id,
                                                groupId: ""
                                            }
                                        }))
                                    })
                                })
                            }
                        }), navigator.mediaDevices.getUserMedia) {
                        var g = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                        navigator.mediaDevices.getUserMedia = function(a) {
                            return b(a, function(a) {
                                return g(a).then(function(b) {
                                    if (a.audio && !b.getAudioTracks().length || a.video && !b.getVideoTracks().length) throw b.getTracks().forEach(function(a) {
                                        a.stop()
                                    }), new DOMException("", "NotFoundError");
                                    return b
                                }, function(a) {
                                    return Promise.reject(c(a))
                                })
                            })
                        }
                    } else navigator.mediaDevices.getUserMedia = function(a) {
                        return f(a)
                    };
                    "undefined" == typeof navigator.mediaDevices.addEventListener && (navigator.mediaDevices.addEventListener = function() {
                        d("Dummy mediaDevices.addEventListener called.")
                    }), "undefined" == typeof navigator.mediaDevices.removeEventListener && (navigator.mediaDevices.removeEventListener = function() {
                        d("Dummy mediaDevices.removeEventListener called.")
                    })
                }
            }, {
                "../utils.js": 10
            }],
            5: [function(a, b, c) {
                "use strict";
                var d = a("sdp"),
                    e = a("../utils").browserDetails,
                    f = {
                        shimPeerConnection: function() {
                            if (window.RTCIceGatherer) {
                                window.RTCIceCandidate || (window.RTCIceCandidate = function(a) {
                                    return a
                                }), window.RTCSessionDescription || (window.RTCSessionDescription = function(a) {
                                    return a
                                });
                                var a = Object.getOwnPropertyDescriptor(MediaStreamTrack.prototype, "enabled");
                                Object.defineProperty(MediaStreamTrack.prototype, "enabled", {
                                    set: function(b) {
                                        a.set.call(this, b);
                                        var c = new Event("enabled");
                                        c.enabled = b, this.dispatchEvent(c)
                                    }
                                })
                            }
                            window.RTCPeerConnection = function(a) {
                                var b = this,
                                    c = document.createDocumentFragment();
                                if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(a) {
                                        b[a] = c[a].bind(c)
                                    }), this.onicecandidate = null, this.onaddstream = null, this.ontrack = null, this.onremovestream = null, this.onsignalingstatechange = null, this.oniceconnectionstatechange = null, this.onnegotiationneeded = null, this.ondatachannel = null, this.localStreams = [], this.remoteStreams = [], this.getLocalStreams = function() {
                                        return b.localStreams
                                    }, this.getRemoteStreams = function() {
                                        return b.remoteStreams
                                    }, this.localDescription = new RTCSessionDescription({
                                        type: "",
                                        sdp: ""
                                    }), this.remoteDescription = new RTCSessionDescription({
                                        type: "",
                                        sdp: ""
                                    }), this.signalingState = "stable", this.iceConnectionState = "new", this.iceGatheringState = "new", this.iceOptions = {
                                        gatherPolicy: "all",
                                        iceServers: []
                                    }, a && a.iceTransportPolicy) switch (a.iceTransportPolicy) {
                                    case "all":
                                    case "relay":
                                        this.iceOptions.gatherPolicy = a.iceTransportPolicy;
                                        break;
                                    case "none":
                                        throw new TypeError('iceTransportPolicy "none" not supported')
                                }
                                if (this.usingBundle = a && "max-bundle" === a.bundlePolicy, a && a.iceServers) {
                                    var d = JSON.parse(JSON.stringify(a.iceServers));
                                    this.iceOptions.iceServers = d.filter(function(a) {
                                        if (a && a.urls) {
                                            var b = a.urls;
                                            return "string" == typeof b && (b = [b]), b = b.filter(function(a) {
                                                return 0 === a.indexOf("turn:") && -1 !== a.indexOf("transport=udp") && -1 === a.indexOf("turn:[") || 0 === a.indexOf("stun:") && e.version >= 14393
                                            })[0], !!b
                                        }
                                        return !1
                                    })
                                }
                                this._config = a, this.transceivers = [], this._localIceCandidatesBuffer = []
                            }, window.RTCPeerConnection.prototype._emitBufferedCandidates = function() {
                                var a = this,
                                    b = d.splitSections(a.localDescription.sdp);
                                this._localIceCandidatesBuffer.forEach(function(c) {
                                    var d = !c.candidate || 0 === Object.keys(c.candidate).length;
                                    if (d)
                                        for (var e = 1; e < b.length; e++) - 1 === b[e].indexOf("\r\na=end-of-candidates\r\n") && (b[e] += "a=end-of-candidates\r\n");
                                    else -1 === c.candidate.candidate.indexOf("typ endOfCandidates") && (b[c.candidate.sdpMLineIndex + 1] += "a=" + c.candidate.candidate + "\r\n");
                                    if (a.localDescription.sdp = b.join(""), a.dispatchEvent(c), null !== a.onicecandidate && a.onicecandidate(c), !c.candidate && "complete" !== a.iceGatheringState) {
                                        var f = a.transceivers.every(function(a) {
                                            return a.iceGatherer && "completed" === a.iceGatherer.state
                                        });
                                        f && (a.iceGatheringState = "complete")
                                    }
                                }), this._localIceCandidatesBuffer = []
                            }, window.RTCPeerConnection.prototype.getConfiguration = function() {
                                return this._config
                            }, window.RTCPeerConnection.prototype.addStream = function(a) {
                                var b = a.clone();
                                a.getTracks().forEach(function(a, c) {
                                    var d = b.getTracks()[c];
                                    a.addEventListener("enabled", function(a) {
                                        d.enabled = a.enabled
                                    })
                                }), this.localStreams.push(b), this._maybeFireNegotiationNeeded()
                            }, window.RTCPeerConnection.prototype.removeStream = function(a) {
                                var b = this.localStreams.indexOf(a);
                                b > -1 && (this.localStreams.splice(b, 1), this._maybeFireNegotiationNeeded())
                            }, window.RTCPeerConnection.prototype.getSenders = function() {
                                return this.transceivers.filter(function(a) {
                                    return !!a.rtpSender
                                }).map(function(a) {
                                    return a.rtpSender
                                })
                            }, window.RTCPeerConnection.prototype.getReceivers = function() {
                                return this.transceivers.filter(function(a) {
                                    return !!a.rtpReceiver
                                }).map(function(a) {
                                    return a.rtpReceiver
                                })
                            }, window.RTCPeerConnection.prototype._getCommonCapabilities = function(a, b) {
                                var c = {
                                    codecs: [],
                                    headerExtensions: [],
                                    fecMechanisms: []
                                };
                                return a.codecs.forEach(function(a) {
                                    for (var d = 0; d < b.codecs.length; d++) {
                                        var e = b.codecs[d];
                                        if (a.name.toLowerCase() === e.name.toLowerCase() && a.clockRate === e.clockRate) {
                                            e.numChannels = Math.min(a.numChannels, e.numChannels), c.codecs.push(e), e.rtcpFeedback = e.rtcpFeedback.filter(function(b) {
                                                for (var c = 0; c < a.rtcpFeedback.length; c++)
                                                    if (a.rtcpFeedback[c].type === b.type && a.rtcpFeedback[c].parameter === b.parameter) return !0;
                                                return !1
                                            });
                                            break
                                        }
                                    }
                                }), a.headerExtensions.forEach(function(a) {
                                    for (var d = 0; d < b.headerExtensions.length; d++) {
                                        var e = b.headerExtensions[d];
                                        if (a.uri === e.uri) {
                                            c.headerExtensions.push(e);
                                            break
                                        }
                                    }
                                }), c
                            }, window.RTCPeerConnection.prototype._createIceAndDtlsTransports = function(a, b) {
                                var c = this,
                                    e = new RTCIceGatherer(c.iceOptions),
                                    f = new RTCIceTransport(e);
                                e.onlocalcandidate = function(g) {
                                    var h = new Event("icecandidate");
                                    h.candidate = {
                                        sdpMid: a,
                                        sdpMLineIndex: b
                                    };
                                    var i = g.candidate,
                                        j = !i || 0 === Object.keys(i).length;
                                    j ? (void 0 === e.state && (e.state = "completed"), h.candidate.candidate = "candidate:1 1 udp 1 0.0.0.0 9 typ endOfCandidates") : (i.component = "RTCP" === f.component ? 2 : 1, h.candidate.candidate = d.writeCandidate(i));
                                    var k = d.splitSections(c.localDescription.sdp); - 1 === h.candidate.candidate.indexOf("typ endOfCandidates") ? k[h.candidate.sdpMLineIndex + 1] += "a=" + h.candidate.candidate + "\r\n" : k[h.candidate.sdpMLineIndex + 1] += "a=end-of-candidates\r\n", c.localDescription.sdp = k.join("");
                                    var l = c.transceivers.every(function(a) {
                                        return a.iceGatherer && "completed" === a.iceGatherer.state
                                    });
                                    switch (c.iceGatheringState) {
                                        case "new":
                                            c._localIceCandidatesBuffer.push(h), j && l && c._localIceCandidatesBuffer.push(new Event("icecandidate"));
                                            break;
                                        case "gathering":
                                            c._emitBufferedCandidates(), c.dispatchEvent(h), null !== c.onicecandidate && c.onicecandidate(h), l && (c.dispatchEvent(new Event("icecandidate")), null !== c.onicecandidate && c.onicecandidate(new Event("icecandidate")), c.iceGatheringState = "complete");
                                            break;
                                        case "complete":
                                    }
                                }, f.onicestatechange = function() {
                                    c._updateConnectionState()
                                };
                                var g = new RTCDtlsTransport(f);
                                return g.ondtlsstatechange = function() {
                                    c._updateConnectionState()
                                }, g.onerror = function() {
                                    g.state = "failed", c._updateConnectionState()
                                }, {
                                    iceGatherer: e,
                                    iceTransport: f,
                                    dtlsTransport: g
                                }
                            }, window.RTCPeerConnection.prototype._transceive = function(a, b, c) {
                                var e = this._getCommonCapabilities(a.localCapabilities, a.remoteCapabilities);
                                b && a.rtpSender && (e.encodings = a.sendEncodingParameters, e.rtcp = {
                                    cname: d.localCName
                                }, a.recvEncodingParameters.length && (e.rtcp.ssrc = a.recvEncodingParameters[0].ssrc), a.rtpSender.send(e)), c && a.rtpReceiver && ("video" === a.kind && a.recvEncodingParameters && a.recvEncodingParameters.forEach(function(a) {
                                    delete a.rtx
                                }), e.encodings = a.recvEncodingParameters, e.rtcp = {
                                    cname: a.cname
                                }, a.sendEncodingParameters.length && (e.rtcp.ssrc = a.sendEncodingParameters[0].ssrc), a.rtpReceiver.receive(e))
                            }, window.RTCPeerConnection.prototype.setLocalDescription = function(a) {
                                var b, c, e = this;
                                if ("offer" === a.type) this._pendingOffer && (b = d.splitSections(a.sdp), c = b.shift(), b.forEach(function(a, b) {
                                    var c = d.parseRtpParameters(a);
                                    e._pendingOffer[b].localCapabilities = c
                                }), this.transceivers = this._pendingOffer, delete this._pendingOffer);
                                else if ("answer" === a.type) {
                                    b = d.splitSections(e.remoteDescription.sdp), c = b.shift();
                                    var f = d.matchPrefix(c, "a=ice-lite").length > 0;
                                    b.forEach(function(a, b) {
                                        var g = e.transceivers[b],
                                            h = g.iceGatherer,
                                            i = g.iceTransport,
                                            j = g.dtlsTransport,
                                            k = g.localCapabilities,
                                            l = g.remoteCapabilities,
                                            m = "0" === a.split("\n", 1)[0].split(" ", 2)[1];
                                        if (!m && !g.isDatachannel) {
                                            var n = d.getIceParameters(a, c);
                                            if (f) {
                                                var o = d.matchPrefix(a, "a=candidate:").map(function(a) {
                                                    return d.parseCandidate(a)
                                                }).filter(function(a) {
                                                    return "1" === a.component
                                                });
                                                o.length && i.setRemoteCandidates(o)
                                            }
                                            var p = d.getDtlsParameters(a, c);
                                            f && (p.role = "server"), e.usingBundle && 0 !== b || (i.start(h, n, f ? "controlling" : "controlled"), j.start(p));
                                            var q = e._getCommonCapabilities(k, l);
                                            e._transceive(g, q.codecs.length > 0, !1)
                                        }
                                    })
                                }
                                switch (this.localDescription = {
                                    type: a.type,
                                    sdp: a.sdp
                                }, a.type) {
                                    case "offer":
                                        this._updateSignalingState("have-local-offer");
                                        break;
                                    case "answer":
                                        this._updateSignalingState("stable");
                                        break;
                                    default:
                                        throw new TypeError('unsupported type "' + a.type + '"')
                                }
                                var g = arguments.length > 1 && "function" == typeof arguments[1];
                                if (g) {
                                    var h = arguments[1];
                                    window.setTimeout(function() {
                                        h(), "new" === e.iceGatheringState && (e.iceGatheringState = "gathering"), e._emitBufferedCandidates()
                                    }, 0)
                                }
                                var i = Promise.resolve();
                                return i.then(function() {
                                    g || ("new" === e.iceGatheringState && (e.iceGatheringState = "gathering"), window.setTimeout(e._emitBufferedCandidates.bind(e), 500))
                                }), i
                            }, window.RTCPeerConnection.prototype.setRemoteDescription = function(a) {
                                var b = this,
                                    c = new MediaStream,
                                    e = [],
                                    f = d.splitSections(a.sdp),
                                    g = f.shift(),
                                    h = d.matchPrefix(g, "a=ice-lite").length > 0;
                                switch (this.usingBundle = d.matchPrefix(g, "a=group:BUNDLE ").length > 0, f.forEach(function(f, i) {
                                    var j = d.splitLines(f),
                                        k = j[0].substr(2).split(" "),
                                        l = k[0],
                                        m = "0" === k[1],
                                        n = d.getDirection(f, g),
                                        o = d.matchPrefix(f, "a=mid:");
                                    if (o = o.length ? o[0].substr(6) : d.generateIdentifier(), "application" === l && "DTLS/SCTP" === k[2]) return void(b.transceivers[i] = {
                                        mid: o,
                                        isDatachannel: !0
                                    });
                                    var p, q, r, s, t, u, v, w, x, y, z, A, B = d.parseRtpParameters(f);
                                    m || (z = d.getIceParameters(f, g), A = d.getDtlsParameters(f, g), A.role = "client"), w = d.parseRtpEncodingParameters(f);
                                    var C, D = d.matchPrefix(f, "a=ssrc:").map(function(a) {
                                        return d.parseSsrcMedia(a)
                                    }).filter(function(a) {
                                        return "cname" === a.attribute
                                    })[0];
                                    D && (C = D.value);
                                    var E = d.matchPrefix(f, "a=end-of-candidates", g).length > 0,
                                        F = d.matchPrefix(f, "a=candidate:").map(function(a) {
                                            return d.parseCandidate(a)
                                        }).filter(function(a) {
                                            return "1" === a.component
                                        });
                                    if ("offer" !== a.type || m) "answer" !== a.type || m || (p = b.transceivers[i], q = p.iceGatherer, r = p.iceTransport, s = p.dtlsTransport, t = p.rtpSender, u = p.rtpReceiver, v = p.sendEncodingParameters, x = p.localCapabilities, b.transceivers[i].recvEncodingParameters = w, b.transceivers[i].remoteCapabilities = B, b.transceivers[i].cname = C, (h || E) && F.length && r.setRemoteCandidates(F), b.usingBundle && 0 !== i || (r.start(q, z, "controlling"), s.start(A)), b._transceive(p, "sendrecv" === n || "recvonly" === n, "sendrecv" === n || "sendonly" === n), !u || "sendrecv" !== n && "sendonly" !== n ? delete p.rtpReceiver : (y = u.track, e.push([y, u]), c.addTrack(y)));
                                    else {
                                        var G = b.usingBundle && i > 0 ? {
                                            iceGatherer: b.transceivers[0].iceGatherer,
                                            iceTransport: b.transceivers[0].iceTransport,
                                            dtlsTransport: b.transceivers[0].dtlsTransport
                                        } : b._createIceAndDtlsTransports(o, i);
                                        if (E && G.iceTransport.setRemoteCandidates(F), x = RTCRtpReceiver.getCapabilities(l), x.codecs = x.codecs.filter(function(a) {
                                                return "rtx" !== a.name
                                            }), v = [{
                                                ssrc: 1001 * (2 * i + 2)
                                            }], u = new RTCRtpReceiver(G.dtlsTransport, l), y = u.track, e.push([y, u]), c.addTrack(y), b.localStreams.length > 0 && b.localStreams[0].getTracks().length >= i) {
                                            var H;
                                            "audio" === l ? H = b.localStreams[0].getAudioTracks()[0] : "video" === l && (H = b.localStreams[0].getVideoTracks()[0]), H && (t = new RTCRtpSender(H, G.dtlsTransport))
                                        }
                                        b.transceivers[i] = {
                                            iceGatherer: G.iceGatherer,
                                            iceTransport: G.iceTransport,
                                            dtlsTransport: G.dtlsTransport,
                                            localCapabilities: x,
                                            remoteCapabilities: B,
                                            rtpSender: t,
                                            rtpReceiver: u,
                                            kind: l,
                                            mid: o,
                                            cname: C,
                                            sendEncodingParameters: v,
                                            recvEncodingParameters: w
                                        }, b._transceive(b.transceivers[i], !1, "sendrecv" === n || "sendonly" === n)
                                    }
                                }), this.remoteDescription = {
                                    type: a.type,
                                    sdp: a.sdp
                                }, a.type) {
                                    case "offer":
                                        this._updateSignalingState("have-remote-offer");
                                        break;
                                    case "answer":
                                        this._updateSignalingState("stable");
                                        break;
                                    default:
                                        throw new TypeError('unsupported type "' + a.type + '"')
                                }
                                return c.getTracks().length && (b.remoteStreams.push(c), window.setTimeout(function() {
                                    var a = new Event("addstream");
                                    a.stream = c, b.dispatchEvent(a), null !== b.onaddstream && window.setTimeout(function() {
                                        b.onaddstream(a)
                                    }, 0), e.forEach(function(d) {
                                        var e = d[0],
                                            f = d[1],
                                            g = new Event("track");
                                        g.track = e, g.receiver = f, g.streams = [c], b.dispatchEvent(a), null !== b.ontrack && window.setTimeout(function() {
                                            b.ontrack(g)
                                        }, 0)
                                    })
                                }, 0)), arguments.length > 1 && "function" == typeof arguments[1] && window.setTimeout(arguments[1], 0), Promise.resolve()
                            }, window.RTCPeerConnection.prototype.close = function() {
                                this.transceivers.forEach(function(a) {
                                    a.iceTransport && a.iceTransport.stop(), a.dtlsTransport && a.dtlsTransport.stop(), a.rtpSender && a.rtpSender.stop(), a.rtpReceiver && a.rtpReceiver.stop()
                                }), this._updateSignalingState("closed")
                            }, window.RTCPeerConnection.prototype._updateSignalingState = function(a) {
                                this.signalingState = a;
                                var b = new Event("signalingstatechange");
                                this.dispatchEvent(b), null !== this.onsignalingstatechange && this.onsignalingstatechange(b)
                            }, window.RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
                                var a = new Event("negotiationneeded");
                                this.dispatchEvent(a), null !== this.onnegotiationneeded && this.onnegotiationneeded(a)
                            }, window.RTCPeerConnection.prototype._updateConnectionState = function() {
                                var a, b = this,
                                    c = {
                                        "new": 0,
                                        closed: 0,
                                        connecting: 0,
                                        checking: 0,
                                        connected: 0,
                                        completed: 0,
                                        failed: 0
                                    };
                                if (this.transceivers.forEach(function(a) {
                                        c[a.iceTransport.state]++, c[a.dtlsTransport.state]++
                                    }), c.connected += c.completed, a = "new", c.failed > 0 ? a = "failed" : c.connecting > 0 || c.checking > 0 ? a = "connecting" : c.disconnected > 0 ? a = "disconnected" : c["new"] > 0 ? a = "new" : (c.connected > 0 || c.completed > 0) && (a = "connected"), a !== b.iceConnectionState) {
                                    b.iceConnectionState = a;
                                    var d = new Event("iceconnectionstatechange");
                                    this.dispatchEvent(d), null !== this.oniceconnectionstatechange && this.oniceconnectionstatechange(d)
                                }
                            }, window.RTCPeerConnection.prototype.createOffer = function() {
                                var a = this;
                                if (this._pendingOffer) throw new Error("createOffer called while there is a pending offer.");
                                var b;
                                1 === arguments.length && "function" != typeof arguments[0] ? b = arguments[0] : 3 === arguments.length && (b = arguments[2]);
                                var c = [],
                                    e = 0,
                                    f = 0;
                                if (this.localStreams.length && (e = this.localStreams[0].getAudioTracks().length, f = this.localStreams[0].getVideoTracks().length), b) {
                                    if (b.mandatory || b.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
                                    void 0 !== b.offerToReceiveAudio && (e = b.offerToReceiveAudio), void 0 !== b.offerToReceiveVideo && (f = b.offerToReceiveVideo)
                                }
                                for (this.localStreams.length && this.localStreams[0].getTracks().forEach(function(a) {
                                        c.push({
                                            kind: a.kind,
                                            track: a,
                                            wantReceive: "audio" === a.kind ? e > 0 : f > 0
                                        }), "audio" === a.kind ? e-- : "video" === a.kind && f--
                                    }); e > 0 || f > 0;) e > 0 && (c.push({
                                    kind: "audio",
                                    wantReceive: !0
                                }), e--), f > 0 && (c.push({
                                    kind: "video",
                                    wantReceive: !0
                                }), f--);
                                var g = d.writeSessionBoilerplate(),
                                    h = [];
                                c.forEach(function(b, c) {
                                    var e = b.track,
                                        f = b.kind,
                                        g = d.generateIdentifier(),
                                        i = a.usingBundle && c > 0 ? {
                                            iceGatherer: h[0].iceGatherer,
                                            iceTransport: h[0].iceTransport,
                                            dtlsTransport: h[0].dtlsTransport
                                        } : a._createIceAndDtlsTransports(g, c),
                                        j = RTCRtpSender.getCapabilities(f);
                                    j.codecs = j.codecs.filter(function(a) {
                                        return "rtx" !== a.name
                                    }), j.codecs.forEach(function(a) {
                                        "H264" === a.name && void 0 === a.parameters["level-asymmetry-allowed"] && (a.parameters["level-asymmetry-allowed"] = "1")
                                    });
                                    var k, l, m = [{
                                        ssrc: 1001 * (2 * c + 1)
                                    }];
                                    e && (k = new RTCRtpSender(e, i.dtlsTransport)), b.wantReceive && (l = new RTCRtpReceiver(i.dtlsTransport, f)), h[c] = {
                                        iceGatherer: i.iceGatherer,
                                        iceTransport: i.iceTransport,
                                        dtlsTransport: i.dtlsTransport,
                                        localCapabilities: j,
                                        remoteCapabilities: null,
                                        rtpSender: k,
                                        rtpReceiver: l,
                                        kind: f,
                                        mid: g,
                                        sendEncodingParameters: m,
                                        recvEncodingParameters: null
                                    }
                                }), this.usingBundle && (g += "a=group:BUNDLE " + h.map(function(a) {
                                    return a.mid
                                }).join(" ") + "\r\n"), c.forEach(function(b, c) {
                                    var e = h[c];
                                    g += d.writeMediaSection(e, e.localCapabilities, "offer", a.localStreams[0])
                                }), this._pendingOffer = h;
                                var i = new RTCSessionDescription({
                                    type: "offer",
                                    sdp: g
                                });
                                return arguments.length && "function" == typeof arguments[0] && window.setTimeout(arguments[0], 0, i), Promise.resolve(i)
                            }, window.RTCPeerConnection.prototype.createAnswer = function() {
                                var a = this,
                                    b = d.writeSessionBoilerplate();
                                this.usingBundle && (b += "a=group:BUNDLE " + this.transceivers.map(function(a) {
                                    return a.mid
                                }).join(" ") + "\r\n"), this.transceivers.forEach(function(c) {
                                    if (c.isDatachannel) return void(b += "m=application 0 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0.0\r\na=mid:" + c.mid + "\r\n");
                                    var e = a._getCommonCapabilities(c.localCapabilities, c.remoteCapabilities);
                                    b += d.writeMediaSection(c, e, "answer", a.localStreams[0])
                                });
                                var c = new RTCSessionDescription({
                                    type: "answer",
                                    sdp: b
                                });
                                return arguments.length && "function" == typeof arguments[0] && window.setTimeout(arguments[0], 0, c), Promise.resolve(c)
                            }, window.RTCPeerConnection.prototype.addIceCandidate = function(a) {
                                if (a) {
                                    var b = a.sdpMLineIndex;
                                    if (a.sdpMid)
                                        for (var c = 0; c < this.transceivers.length; c++)
                                            if (this.transceivers[c].mid === a.sdpMid) {
                                                b = c;
                                                break
                                            }
                                    var e = this.transceivers[b];
                                    if (e) {
                                        var f = Object.keys(a.candidate).length > 0 ? d.parseCandidate(a.candidate) : {};
                                        if ("tcp" === f.protocol && (0 === f.port || 9 === f.port)) return;
                                        if ("1" !== f.component) return;
                                        "endOfCandidates" === f.type && (f = {}), e.iceTransport.addRemoteCandidate(f);
                                        var g = d.splitSections(this.remoteDescription.sdp);
                                        g[b + 1] += (f.type ? a.candidate.trim() : "a=end-of-candidates") + "\r\n", this.remoteDescription.sdp = g.join("")
                                    }
                                } else this.transceivers.forEach(function(a) {
                                    a.iceTransport.addRemoteCandidate({})
                                });
                                return arguments.length > 1 && "function" == typeof arguments[1] && window.setTimeout(arguments[1], 0), Promise.resolve()
                            }, window.RTCPeerConnection.prototype.getStats = function() {
                                var a = [];
                                this.transceivers.forEach(function(b) {
                                    ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(c) {
                                        b[c] && a.push(b[c].getStats())
                                    })
                                });
                                var b = arguments.length > 1 && "function" == typeof arguments[1] && arguments[1];
                                return new Promise(function(c) {
                                    var d = new Map;
                                    Promise.all(a).then(function(a) {
                                        a.forEach(function(a) {
                                            Object.keys(a).forEach(function(b) {
                                                d.set(b, a[b]), d[b] = a[b]
                                            })
                                        }), b && window.setTimeout(b, 0, d), c(d)
                                    })
                                })
                            }
                        }
                    };
                b.exports = {
                    shimPeerConnection: f.shimPeerConnection,
                    shimGetUserMedia: a("./getusermedia")
                }
            }, {
                "../utils": 10,
                "./getusermedia": 6,
                sdp: 1
            }],
            6: [function(a, b, c) {
                "use strict";
                b.exports = function() {
                    var a = function(a) {
                            return {
                                name: {
                                    PermissionDeniedError: "NotAllowedError"
                                }[a.name] || a.name,
                                message: a.message,
                                constraint: a.constraint,
                                toString: function() {
                                    return this.name
                                }
                            }
                        },
                        b = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                    navigator.mediaDevices.getUserMedia = function(c) {
                        return b(c)["catch"](function(b) {
                            return Promise.reject(a(b))
                        })
                    }
                }
            }, {}],
            7: [function(a, b, c) {
                "use strict";
                var d = a("../utils").browserDetails,
                    e = {
                        shimOnTrack: function() {
                            "object" != typeof window || !window.RTCPeerConnection || "ontrack" in window.RTCPeerConnection.prototype || Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", {
                                get: function() {
                                    return this._ontrack
                                },
                                set: function(a) {
                                    this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = a), this.addEventListener("addstream", this._ontrackpoly = function(a) {
                                        a.stream.getTracks().forEach(function(b) {
                                            var c = new Event("track");
                                            c.track = b, c.receiver = {
                                                track: b
                                            }, c.streams = [a.stream], this.dispatchEvent(c)
                                        }.bind(this))
                                    }.bind(this))
                                }
                            })
                        },
                        shimSourceObject: function() {
                            "object" == typeof window && (!window.HTMLMediaElement || "srcObject" in window.HTMLMediaElement.prototype || Object.defineProperty(window.HTMLMediaElement.prototype, "srcObject", {
                                get: function() {
                                    return this.mozSrcObject
                                },
                                set: function(a) {
                                    this.mozSrcObject = a
                                }
                            }))
                        },
                        shimPeerConnection: function() {
                            if ("object" == typeof window && (window.RTCPeerConnection || window.mozRTCPeerConnection)) {
                                window.RTCPeerConnection || (window.RTCPeerConnection = function(a, b) {
                                    if (d.version < 38 && a && a.iceServers) {
                                        for (var c = [], e = 0; e < a.iceServers.length; e++) {
                                            var f = a.iceServers[e];
                                            if (f.hasOwnProperty("urls"))
                                                for (var g = 0; g < f.urls.length; g++) {
                                                    var h = {
                                                        url: f.urls[g]
                                                    };
                                                    0 === f.urls[g].indexOf("turn") && (h.username = f.username, h.credential = f.credential), c.push(h)
                                                } else c.push(a.iceServers[e])
                                        }
                                        a.iceServers = c
                                    }
                                    return new mozRTCPeerConnection(a, b)
                                }, window.RTCPeerConnection.prototype = mozRTCPeerConnection.prototype, mozRTCPeerConnection.generateCertificate && Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
                                    get: function() {
                                        return mozRTCPeerConnection.generateCertificate
                                    }
                                }), window.RTCSessionDescription = mozRTCSessionDescription, window.RTCIceCandidate = mozRTCIceCandidate), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(a) {
                                    var b = RTCPeerConnection.prototype[a];
                                    RTCPeerConnection.prototype[a] = function() {
                                        return arguments[0] = new("addIceCandidate" === a ? RTCIceCandidate : RTCSessionDescription)(arguments[0]), b.apply(this, arguments)
                                    }
                                });
                                var a = RTCPeerConnection.prototype.addIceCandidate;
                                if (RTCPeerConnection.prototype.addIceCandidate = function() {
                                        return arguments[0] ? a.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                                    }, d.version < 48) {
                                    var b = function(a) {
                                            var b = new Map;
                                            return Object.keys(a).forEach(function(c) {
                                                b.set(c, a[c]), b[c] = a[c]
                                            }), b
                                        },
                                        c = RTCPeerConnection.prototype.getStats;
                                    RTCPeerConnection.prototype.getStats = function(a, d, e) {
                                        return c.apply(this, [a || null]).then(function(a) {
                                            return b(a)
                                        }).then(d, e)
                                    }
                                }
                            }
                        }
                    };
                b.exports = {
                    shimOnTrack: e.shimOnTrack,
                    shimSourceObject: e.shimSourceObject,
                    shimPeerConnection: e.shimPeerConnection,
                    shimGetUserMedia: a("./getusermedia")
                }
            }, {
                "../utils": 10,
                "./getusermedia": 8
            }],
            8: [function(a, b, c) {
                "use strict";
                var d = a("../utils").log,
                    e = a("../utils").browserDetails;
                b.exports = function() {
                    var a = function(a) {
                            return {
                                name: {
                                    SecurityError: "NotAllowedError",
                                    PermissionDeniedError: "NotAllowedError"
                                }[a.name] || a.name,
                                message: {
                                    "The operation is insecure.": "The request is not allowed by the user agent or the platform in the current context."
                                }[a.message] || a.message,
                                constraint: a.constraint,
                                toString: function() {
                                    return this.name + (this.message && ": ") + this.message
                                }
                            }
                        },
                        b = function(b, c, f) {
                            var g = function(a) {
                                if ("object" != typeof a || a.require) return a;
                                var b = [];
                                return Object.keys(a).forEach(function(c) {
                                    if ("require" !== c && "advanced" !== c && "mediaSource" !== c) {
                                        var d = a[c] = "object" == typeof a[c] ? a[c] : {
                                            ideal: a[c]
                                        };
                                        if (void 0 === d.min && void 0 === d.max && void 0 === d.exact || b.push(c), void 0 !== d.exact && ("number" == typeof d.exact ? d.min = d.max = d.exact : a[c] = d.exact, delete d.exact), void 0 !== d.ideal) {
                                            a.advanced = a.advanced || [];
                                            var e = {};
                                            "number" == typeof d.ideal ? e[c] = {
                                                min: d.ideal,
                                                max: d.ideal
                                            } : e[c] = d.ideal, a.advanced.push(e), delete d.ideal, Object.keys(d).length || delete a[c]
                                        }
                                    }
                                }), b.length && (a.require = b), a
                            };
                            return b = JSON.parse(JSON.stringify(b)), e.version < 38 && (d("spec: " + JSON.stringify(b)), b.audio && (b.audio = g(b.audio)), b.video && (b.video = g(b.video)), d("ff37: " + JSON.stringify(b))), navigator.mozGetUserMedia(b, c, function(b) {
                                f(a(b))
                            })
                        },
                        c = function(a) {
                            return new Promise(function(c, d) {
                                b(a, c, d)
                            })
                        };
                    if (navigator.mediaDevices || (navigator.mediaDevices = {
                            getUserMedia: c,
                            addEventListener: function() {},
                            removeEventListener: function() {}
                        }), navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function() {
                            return new Promise(function(a) {
                                var b = [{
                                    kind: "audioinput",
                                    deviceId: "default",
                                    label: "",
                                    groupId: ""
                                }, {
                                    kind: "videoinput",
                                    deviceId: "default",
                                    label: "",
                                    groupId: ""
                                }];
                                a(b)
                            })
                        }, e.version < 41) {
                        var f = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
                        navigator.mediaDevices.enumerateDevices = function() {
                            return f().then(void 0, function(a) {
                                if ("NotFoundError" === a.name) return [];
                                throw a
                            })
                        }
                    }
                    if (e.version < 49) {
                        var g = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                        navigator.mediaDevices.getUserMedia = function(b) {
                            return g(b).then(function(a) {
                                if (b.audio && !a.getAudioTracks().length || b.video && !a.getVideoTracks().length) throw a.getTracks().forEach(function(a) {
                                    a.stop()
                                }), new DOMException("The object can not be found here.", "NotFoundError");
                                return a
                            }, function(b) {
                                return Promise.reject(a(b))
                            })
                        }
                    }
                    navigator.getUserMedia = function(a, c, d) {
                        return e.version < 44 ? b(a, c, d) : (console.warn("navigator.getUserMedia has been replaced by navigator.mediaDevices.getUserMedia"), void navigator.mediaDevices.getUserMedia(a).then(c, d))
                    }
                }
            }, {
                "../utils": 10
            }],
            9: [function(a, b, c) {
                "use strict";
                var d = {
                    shimGetUserMedia: function() {
                        navigator.getUserMedia = navigator.webkitGetUserMedia
                    }
                };
                b.exports = {
                    shimGetUserMedia: d.shimGetUserMedia
                }
            }, {}],
            10: [function(a, b, c) {
                "use strict";
                var d = !0,
                    e = {
                        disableLog: function(a) {
                            return "boolean" != typeof a ? new Error("Argument type: " + typeof a + ". Please use a boolean.") : (d = a, a ? "adapter.js logging disabled" : "adapter.js logging enabled")
                        },
                        log: function() {
                            if ("object" == typeof window) {
                                if (d) return;
                                "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments)
                            }
                        },
                        extractVersion: function(a, b, c) {
                            var d = a.match(b);
                            return d && d.length >= c && parseInt(d[c], 10)
                        },
                        detectBrowser: function() {
                            var a = {};
                            if (a.browser = null, a.version = null, "undefined" == typeof window || !window.navigator) return a.browser = "Not a browser.", a;
                            if (navigator.mozGetUserMedia) a.browser = "firefox", a.version = this.extractVersion(navigator.userAgent, /Firefox\/([0-9]+)\./, 1);
                            else if (navigator.webkitGetUserMedia)
                                if (window.webkitRTCPeerConnection) a.browser = "chrome", a.version = this.extractVersion(navigator.userAgent, /Chrom(e|ium)\/([0-9]+)\./, 2);
                                else {
                                    if (!navigator.userAgent.match(/Version\/(\d+).(\d+)/)) return a.browser = "Unsupported webkit-based browser with GUM support but no WebRTC support.", a;
                                    a.browser = "safari", a.version = this.extractVersion(navigator.userAgent, /AppleWebKit\/([0-9]+)\./, 1)
                                }
                            else {
                                if (!navigator.mediaDevices || !navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) return a.browser = "Not a supported browser.", a;
                                a.browser = "edge", a.version = this.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2)
                            }
                            return a
                        }
                    };
                b.exports = {
                    log: e.log,
                    disableLog: e.disableLog,
                    browserDetails: e.detectBrowser(),
                    extractVersion: e.extractVersion
                }
            }, {}]
        }, {}, [2])(2)
    }),
    function() {
        window.WebComponents = window.WebComponents || {
            flags: {}
        };
        var a = "webcomponents-lite.js",
            b = document.querySelector('script[src*="' + a + '"]'),
            c = {};
        if (!c.noOpts) {
            if (location.search.slice(1).split("&").forEach(function(a) {
                    var b, d = a.split("=");
                    d[0] && (b = d[0].match(/wc-(.+)/)) && (c[b[1]] = d[1] || !0)
                }), b)
                for (var d, e = 0; d = b.attributes[e]; e++) "src" !== d.name && (c[d.name] = d.value || !0);
            if (c.log && c.log.split) {
                var f = c.log.split(",");
                c.log = {}, f.forEach(function(a) {
                    c.log[a] = !0
                })
            } else c.log = {}
        }
        c.register && (window.CustomElements = window.CustomElements || {
            flags: {}
        }, window.CustomElements.flags.register = c.register), WebComponents.flags = c
    }(),
    function(a) {
        "use strict";

        function b(a) {
            return void 0 !== m[a]
        }

        function c() {
            h.call(this), this._isInvalid = !0
        }

        function d(a) {
            return "" == a && c.call(this), a.toLowerCase()
        }

        function e(a) {
            var b = a.charCodeAt(0);
            return b > 32 && 127 > b && -1 == [34, 35, 60, 62, 63, 96].indexOf(b) ? a : encodeURIComponent(a)
        }

        function f(a) {
            var b = a.charCodeAt(0);
            return b > 32 && 127 > b && -1 == [34, 35, 60, 62, 96].indexOf(b) ? a : encodeURIComponent(a)
        }

        function g(a, g, h) {
            function i(a) {
                t.push(a)
            }
            var j = g || "scheme start",
                k = 0,
                l = "",
                r = !1,
                s = !1,
                t = [];
            a: for (;
                (a[k - 1] != o || 0 == k) && !this._isInvalid;) {
                var u = a[k];
                switch (j) {
                    case "scheme start":
                        if (!u || !p.test(u)) {
                            if (g) {
                                i("Invalid scheme.");
                                break a
                            }
                            l = "", j = "no scheme";
                            continue
                        }
                        l += u.toLowerCase(), j = "scheme";
                        break;
                    case "scheme":
                        if (u && q.test(u)) l += u.toLowerCase();
                        else {
                            if (":" != u) {
                                if (g) {
                                    if (o == u) break a;
                                    i("Code point not allowed in scheme: " + u);
                                    break a
                                }
                                l = "", k = 0, j = "no scheme";
                                continue
                            }
                            if (this._scheme = l, l = "", g) break a;
                            b(this._scheme) && (this._isRelative = !0), j = "file" == this._scheme ? "relative" : this._isRelative && h && h._scheme == this._scheme ? "relative or authority" : this._isRelative ? "authority first slash" : "scheme data"
                        }
                        break;
                    case "scheme data":
                        "?" == u ? (this._query = "?", j = "query") : "#" == u ? (this._fragment = "#", j = "fragment") : o != u && "	" != u && "\n" != u && "\r" != u && (this._schemeData += e(u));
                        break;
                    case "no scheme":
                        if (h && b(h._scheme)) {
                            j = "relative";
                            continue
                        }
                        i("Missing scheme."), c.call(this);
                        break;
                    case "relative or authority":
                        if ("/" != u || "/" != a[k + 1]) {
                            i("Expected /, got: " + u), j = "relative";
                            continue
                        }
                        j = "authority ignore slashes";
                        break;
                    case "relative":
                        if (this._isRelative = !0, "file" != this._scheme && (this._scheme = h._scheme), o == u) {
                            this._host = h._host, this._port = h._port, this._path = h._path.slice(), this._query = h._query, this._username = h._username, this._password = h._password;
                            break a
                        }
                        if ("/" == u || "\\" == u) "\\" == u && i("\\ is an invalid code point."), j = "relative slash";
                        else if ("?" == u) this._host = h._host, this._port = h._port, this._path = h._path.slice(), this._query = "?", this._username = h._username, this._password = h._password, j = "query";
                        else {
                            if ("#" != u) {
                                var v = a[k + 1],
                                    w = a[k + 2];
                                ("file" != this._scheme || !p.test(u) || ":" != v && "|" != v || o != w && "/" != w && "\\" != w && "?" != w && "#" != w) && (this._host = h._host, this._port = h._port, this._username = h._username, this._password = h._password, this._path = h._path.slice(), this._path.pop()), j = "relative path";
                                continue
                            }
                            this._host = h._host, this._port = h._port, this._path = h._path.slice(), this._query = h._query, this._fragment = "#", this._username = h._username, this._password = h._password, j = "fragment"
                        }
                        break;
                    case "relative slash":
                        if ("/" != u && "\\" != u) {
                            "file" != this._scheme && (this._host = h._host, this._port = h._port, this._username = h._username, this._password = h._password), j = "relative path";
                            continue
                        }
                        "\\" == u && i("\\ is an invalid code point."), j = "file" == this._scheme ? "file host" : "authority ignore slashes";
                        break;
                    case "authority first slash":
                        if ("/" != u) {
                            i("Expected '/', got: " + u), j = "authority ignore slashes";
                            continue
                        }
                        j = "authority second slash";
                        break;
                    case "authority second slash":
                        if (j = "authority ignore slashes", "/" != u) {
                            i("Expected '/', got: " + u);
                            continue
                        }
                        break;
                    case "authority ignore slashes":
                        if ("/" != u && "\\" != u) {
                            j = "authority";
                            continue
                        }
                        i("Expected authority, got: " + u);
                        break;
                    case "authority":
                        if ("@" == u) {
                            r && (i("@ already seen."), l += "%40"), r = !0;
                            for (var x = 0; x < l.length; x++) {
                                var y = l[x];
                                if ("	" != y && "\n" != y && "\r" != y)
                                    if (":" != y || null !== this._password) {
                                        var z = e(y);
                                        null !== this._password ? this._password += z : this._username += z
                                    } else this._password = "";
                                else i("Invalid whitespace in authority.")
                            }
                            l = ""
                        } else {
                            if (o == u || "/" == u || "\\" == u || "?" == u || "#" == u) {
                                k -= l.length, l = "", j = "host";
                                continue
                            }
                            l += u
                        }
                        break;
                    case "file host":
                        if (o == u || "/" == u || "\\" == u || "?" == u || "#" == u) {
                            2 != l.length || !p.test(l[0]) || ":" != l[1] && "|" != l[1] ? 0 == l.length ? j = "relative path start" : (this._host = d.call(this, l), l = "", j = "relative path start") : j = "relative path";
                            continue
                        }
                        "	" == u || "\n" == u || "\r" == u ? i("Invalid whitespace in file host.") : l += u;
                        break;
                    case "host":
                    case "hostname":
                        if (":" != u || s) {
                            if (o == u || "/" == u || "\\" == u || "?" == u || "#" == u) {
                                if (this._host = d.call(this, l), l = "", j = "relative path start", g) break a;
                                continue
                            }
                            "	" != u && "\n" != u && "\r" != u ? ("[" == u ? s = !0 : "]" == u && (s = !1), l += u) : i("Invalid code point in host/hostname: " + u)
                        } else if (this._host = d.call(this, l), l = "", j = "port", "hostname" == g) break a;
                        break;
                    case "port":
                        if (/[0-9]/.test(u)) l += u;
                        else {
                            if (o == u || "/" == u || "\\" == u || "?" == u || "#" == u || g) {
                                if ("" != l) {
                                    var A = parseInt(l, 10);
                                    A != m[this._scheme] && (this._port = A + ""), l = ""
                                }
                                if (g) break a;
                                j = "relative path start";
                                continue
                            }
                            "	" == u || "\n" == u || "\r" == u ? i("Invalid code point in port: " + u) : c.call(this)
                        }
                        break;
                    case "relative path start":
                        if ("\\" == u && i("'\\' not allowed in path."), j = "relative path", "/" != u && "\\" != u) continue;
                        break;
                    case "relative path":
                        if (o != u && "/" != u && "\\" != u && (g || "?" != u && "#" != u)) "	" != u && "\n" != u && "\r" != u && (l += e(u));
                        else {
                            "\\" == u && i("\\ not allowed in relative path.");
                            var B;
                            (B = n[l.toLowerCase()]) && (l = B), ".." == l ? (this._path.pop(), "/" != u && "\\" != u && this._path.push("")) : "." == l && "/" != u && "\\" != u ? this._path.push("") : "." != l && ("file" == this._scheme && 0 == this._path.length && 2 == l.length && p.test(l[0]) && "|" == l[1] && (l = l[0] + ":"), this._path.push(l)), l = "", "?" == u ? (this._query = "?", j = "query") : "#" == u && (this._fragment = "#", j = "fragment")
                        }
                        break;
                    case "query":
                        g || "#" != u ? o != u && "	" != u && "\n" != u && "\r" != u && (this._query += f(u)) : (this._fragment = "#", j = "fragment");
                        break;
                    case "fragment":
                        o != u && "	" != u && "\n" != u && "\r" != u && (this._fragment += u)
                }
                k++
            }
        }

        function h() {
            this._scheme = "", this._schemeData = "", this._username = "", this._password = null, this._host = "", this._port = "", this._path = [], this._query = "", this._fragment = "", this._isInvalid = !1, this._isRelative = !1
        }

        function i(a, b) {
            void 0 === b || b instanceof i || (b = new i(String(b))), this._url = a, h.call(this);
            var c = a.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");
            g.call(this, c, null, b)
        }
        var j = !1;
        if (!a.forceJURL) try {
            var k = new URL("b", "http://a");
            k.pathname = "c%20d", j = "http://a/c%20d" === k.href
        } catch (l) {}
        if (!j) {
            var m = Object.create(null);
            m.ftp = 21, m.file = 0, m.gopher = 70, m.http = 80, m.https = 443, m.ws = 80, m.wss = 443;
            var n = Object.create(null);
            n["%2e"] = ".", n[".%2e"] = "..", n["%2e."] = "..", n["%2e%2e"] = "..";
            var o = void 0,
                p = /[a-zA-Z]/,
                q = /[a-zA-Z0-9\+\-\.]/;
            i.prototype = {
                toString: function() {
                    return this.href
                },
                get href() {
                    if (this._isInvalid) return this._url;
                    var a = "";
                    return "" == this._username && null == this._password || (a = this._username + (null != this._password ? ":" + this._password : "") + "@"), this.protocol + (this._isRelative ? "//" + a + this.host : "") + this.pathname + this._query + this._fragment
                },
                set href(a) {
                    h.call(this), g.call(this, a)
                },
                get protocol() {
                    return this._scheme + ":"
                },
                set protocol(a) {
                    this._isInvalid || g.call(this, a + ":", "scheme start")
                },
                get host() {
                    return this._isInvalid ? "" : this._port ? this._host + ":" + this._port : this._host
                },
                set host(a) {
                    !this._isInvalid && this._isRelative && g.call(this, a, "host")
                },
                get hostname() {
                    return this._host
                },
                set hostname(a) {
                    !this._isInvalid && this._isRelative && g.call(this, a, "hostname")
                },
                get port() {
                    return this._port
                },
                set port(a) {
                    !this._isInvalid && this._isRelative && g.call(this, a, "port")
                },
                get pathname() {
                    return this._isInvalid ? "" : this._isRelative ? "/" + this._path.join("/") : this._schemeData
                },
                set pathname(a) {
                    !this._isInvalid && this._isRelative && (this._path = [], g.call(this, a, "relative path start"))
                },
                get search() {
                    return this._isInvalid || !this._query || "?" == this._query ? "" : this._query
                },
                set search(a) {
                    !this._isInvalid && this._isRelative && (this._query = "?", "?" == a[0] && (a = a.slice(1)), g.call(this, a, "query"))
                },
                get hash() {
                    return this._isInvalid || !this._fragment || "#" == this._fragment ? "" : this._fragment
                },
                set hash(a) {
                    this._isInvalid || (this._fragment = "#", "#" == a[0] && (a = a.slice(1)), g.call(this, a, "fragment"))
                },
                get origin() {
                    var a;
                    if (this._isInvalid || !this._scheme) return "";
                    switch (this._scheme) {
                        case "data":
                        case "file":
                        case "javascript":
                        case "mailto":
                            return "null"
                    }
                    return a = this.host, a ? this._scheme + "://" + a : ""
                }
            };
            var r = a.URL;
            r && (i.createObjectURL = function(a) {
                return r.createObjectURL.apply(r, arguments)
            }, i.revokeObjectURL = function(a) {
                r.revokeObjectURL(a)
            }), a.URL = i
        }
    }(self), "undefined" == typeof WeakMap && ! function() {
        var a = Object.defineProperty,
            b = Date.now() % 1e9,
            c = function() {
                this.name = "__st" + (1e9 * Math.random() >>> 0) + (b++ + "__")
            };
        c.prototype = {
            set: function(b, c) {
                var d = b[this.name];
                return d && d[0] === b ? d[1] = c : a(b, this.name, {
                    value: [b, c],
                    writable: !0
                }), this
            },
            get: function(a) {
                var b;
                return (b = a[this.name]) && b[0] === a ? b[1] : void 0
            },
            "delete": function(a) {
                var b = a[this.name];
                return b && b[0] === a ? (b[0] = b[1] = void 0, !0) : !1
            },
            has: function(a) {
                var b = a[this.name];
                return b ? b[0] === a : !1
            }
        }, window.WeakMap = c
    }(),
    function(a) {
        function b(a) {
            u.push(a), t || (t = !0, p(d))
        }

        function c(a) {
            return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(a) || a
        }

        function d() {
            t = !1;
            var a = u;
            u = [], a.sort(function(a, b) {
                return a.uid_ - b.uid_
            });
            var b = !1;
            a.forEach(function(a) {
                var c = a.takeRecords();
                e(a), c.length && (a.callback_(c, a), b = !0)
            }), b && d()
        }

        function e(a) {
            a.nodes_.forEach(function(b) {
                var c = q.get(b);
                c && c.forEach(function(b) {
                    b.observer === a && b.removeTransientObservers()
                })
            })
        }

        function f(a, b) {
            for (var c = a; c; c = c.parentNode) {
                var d = q.get(c);
                if (d)
                    for (var e = 0; e < d.length; e++) {
                        var f = d[e],
                            g = f.options;
                        if (c === a || g.subtree) {
                            var h = b(g);
                            h && f.enqueue(h)
                        }
                    }
            }
        }

        function g(a) {
            this.callback_ = a, this.nodes_ = [], this.records_ = [], this.uid_ = ++v
        }

        function h(a, b) {
            this.type = a, this.target = b, this.addedNodes = [], this.removedNodes = [], this.previousSibling = null, this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, this.oldValue = null
        }

        function i(a) {
            var b = new h(a.type, a.target);
            return b.addedNodes = a.addedNodes.slice(), b.removedNodes = a.removedNodes.slice(), b.previousSibling = a.previousSibling, b.nextSibling = a.nextSibling, b.attributeName = a.attributeName, b.attributeNamespace = a.attributeNamespace, b.oldValue = a.oldValue, b
        }

        function j(a, b) {
            return w = new h(a, b)
        }

        function k(a) {
            return x ? x : (x = i(w), x.oldValue = a, x)
        }

        function l() {
            w = x = void 0
        }

        function m(a) {
            return a === x || a === w
        }

        function n(a, b) {
            return a === b ? a : x && m(a) ? x : null
        }

        function o(a, b, c) {
            this.observer = a, this.target = b, this.options = c, this.transientObservedNodes = []
        }
        if (!a.JsMutationObserver) {
            var p, q = new WeakMap;
            if (/Trident|Edge/.test(navigator.userAgent)) p = setTimeout;
            else if (window.setImmediate) p = window.setImmediate;
            else {
                var r = [],
                    s = String(Math.random());
                window.addEventListener("message", function(a) {
                    if (a.data === s) {
                        var b = r;
                        r = [], b.forEach(function(a) {
                            a()
                        })
                    }
                }), p = function(a) {
                    r.push(a), window.postMessage(s, "*")
                }
            }
            var t = !1,
                u = [],
                v = 0;
            g.prototype = {
                observe: function(a, b) {
                    if (a = c(a), !b.childList && !b.attributes && !b.characterData || b.attributeOldValue && !b.attributes || b.attributeFilter && b.attributeFilter.length && !b.attributes || b.characterDataOldValue && !b.characterData) throw new SyntaxError;
                    var d = q.get(a);
                    d || q.set(a, d = []);
                    for (var e, f = 0; f < d.length; f++)
                        if (d[f].observer === this) {
                            e = d[f], e.removeListeners(), e.options = b;
                            break
                        }
                    e || (e = new o(this, a, b), d.push(e), this.nodes_.push(a)), e.addListeners()
                },
                disconnect: function() {
                    this.nodes_.forEach(function(a) {
                        for (var b = q.get(a), c = 0; c < b.length; c++) {
                            var d = b[c];
                            if (d.observer === this) {
                                d.removeListeners(), b.splice(c, 1);
                                break
                            }
                        }
                    }, this), this.records_ = []
                },
                takeRecords: function() {
                    var a = this.records_;
                    return this.records_ = [], a
                }
            };
            var w, x;
            o.prototype = {
                enqueue: function(a) {
                    var c = this.observer.records_,
                        d = c.length;
                    if (c.length > 0) {
                        var e = c[d - 1],
                            f = n(e, a);
                        if (f) return void(c[d - 1] = f)
                    } else b(this.observer);
                    c[d] = a
                },
                addListeners: function() {
                    this.addListeners_(this.target)
                },
                addListeners_: function(a) {
                    var b = this.options;
                    b.attributes && a.addEventListener("DOMAttrModified", this, !0), b.characterData && a.addEventListener("DOMCharacterDataModified", this, !0), b.childList && a.addEventListener("DOMNodeInserted", this, !0), (b.childList || b.subtree) && a.addEventListener("DOMNodeRemoved", this, !0)
                },
                removeListeners: function() {
                    this.removeListeners_(this.target)
                },
                removeListeners_: function(a) {
                    var b = this.options;
                    b.attributes && a.removeEventListener("DOMAttrModified", this, !0), b.characterData && a.removeEventListener("DOMCharacterDataModified", this, !0), b.childList && a.removeEventListener("DOMNodeInserted", this, !0), (b.childList || b.subtree) && a.removeEventListener("DOMNodeRemoved", this, !0)
                },
                addTransientObserver: function(a) {
                    if (a !== this.target) {
                        this.addListeners_(a), this.transientObservedNodes.push(a);
                        var b = q.get(a);
                        b || q.set(a, b = []), b.push(this)
                    }
                },
                removeTransientObservers: function() {
                    var a = this.transientObservedNodes;
                    this.transientObservedNodes = [], a.forEach(function(a) {
                        this.removeListeners_(a);
                        for (var b = q.get(a), c = 0; c < b.length; c++)
                            if (b[c] === this) {
                                b.splice(c, 1);
                                break
                            }
                    }, this)
                },
                handleEvent: function(a) {
                    switch (a.stopImmediatePropagation(), a.type) {
                        case "DOMAttrModified":
                            var b = a.attrName,
                                c = a.relatedNode.namespaceURI,
                                d = a.target,
                                e = new j("attributes", d);
                            e.attributeName = b, e.attributeNamespace = c;
                            var g = a.attrChange === MutationEvent.ADDITION ? null : a.prevValue;
                            f(d, function(a) {
                                return !a.attributes || a.attributeFilter && a.attributeFilter.length && -1 === a.attributeFilter.indexOf(b) && -1 === a.attributeFilter.indexOf(c) ? void 0 : a.attributeOldValue ? k(g) : e
                            });
                            break;
                        case "DOMCharacterDataModified":
                            var d = a.target,
                                e = j("characterData", d),
                                g = a.prevValue;
                            f(d, function(a) {
                                return a.characterData ? a.characterDataOldValue ? k(g) : e : void 0
                            });
                            break;
                        case "DOMNodeRemoved":
                            this.addTransientObserver(a.target);
                        case "DOMNodeInserted":
                            var h, i, m = a.target;
                            "DOMNodeInserted" === a.type ? (h = [m], i = []) : (h = [], i = [m]);
                            var n = m.previousSibling,
                                o = m.nextSibling,
                                e = j("childList", a.target.parentNode);
                            e.addedNodes = h, e.removedNodes = i, e.previousSibling = n, e.nextSibling = o, f(a.relatedNode, function(a) {
                                return a.childList ? e : void 0
                            })
                    }
                    l()
                }
            }, a.JsMutationObserver = g, a.MutationObserver || (a.MutationObserver = g, g._isPolyfilled = !0)
        }
    }(self),
    function() {
        function a(a) {
            switch (a) {
                case "&":
                    return "&amp;";
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case "Â ":
                    return "&nbsp;"
            }
        }

        function b(b) {
            return b.replace(l, a)
        }
        var c = "undefined" == typeof HTMLTemplateElement;
        /Trident/.test(navigator.userAgent) && ! function() {
            var a = document.importNode;
            document.importNode = function() {
                var b = a.apply(document, arguments);
                if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                    var c = document.createDocumentFragment();
                    return c.appendChild(b), c
                }
                return b
            }
        }();
        var d = function() {
                if (!c) {
                    var a = document.createElement("template"),
                        b = document.createElement("template");
                    b.content.appendChild(document.createElement("div")), a.content.appendChild(b);
                    var d = a.cloneNode(!0);
                    return 0 === d.content.childNodes.length || 0 === d.content.firstChild.content.childNodes.length
                }
            }(),
            e = "template",
            f = function() {};
        if (c) {
            var g = document.implementation.createHTMLDocument("template"),
                h = !0,
                i = document.createElement("style");
            i.textContent = e + "{display:none;}";
            var j = document.head;
            j.insertBefore(i, j.firstElementChild), f.prototype = Object.create(HTMLElement.prototype), f.decorate = function(a) {
                if (!a.content) {
                    a.content = g.createDocumentFragment();
                    for (var c; c = a.firstChild;) a.content.appendChild(c);
                    if (a.cloneNode = function(a) {
                            return f.cloneNode(this, a)
                        }, h) try {
                        Object.defineProperty(a, "innerHTML", {
                            get: function() {
                                for (var a = "", c = this.content.firstChild; c; c = c.nextSibling) a += c.outerHTML || b(c.data);
                                return a
                            },
                            set: function(a) {
                                for (g.body.innerHTML = a, f.bootstrap(g); this.content.firstChild;) this.content.removeChild(this.content.firstChild);
                                for (; g.body.firstChild;) this.content.appendChild(g.body.firstChild)
                            },
                            configurable: !0
                        })
                    } catch (d) {
                        h = !1
                    }
                    f.bootstrap(a.content)
                }
            }, f.bootstrap = function(a) {
                for (var b, c = a.querySelectorAll(e), d = 0, g = c.length; g > d && (b = c[d]); d++) f.decorate(b)
            }, document.addEventListener("DOMContentLoaded", function() {
                f.bootstrap(document)
            });
            var k = document.createElement;
            document.createElement = function() {
                "use strict";
                var a = k.apply(document, arguments);
                return "template" === a.localName && f.decorate(a), a
            };
            var l = /[&\u00A0<>]/g
        }
        if (c || d) {
            var m = Node.prototype.cloneNode;
            f.cloneNode = function(a, b) {
                var c = m.call(a, !1);
                return this.decorate && this.decorate(c), b && (c.content.appendChild(m.call(a.content, !0)), this.fixClonedDom(c.content, a.content)), c
            }, f.fixClonedDom = function(a, b) {
                if (b.querySelectorAll)
                    for (var c, d, f = b.querySelectorAll(e), g = a.querySelectorAll(e), h = 0, i = g.length; i > h; h++) d = f[h], c = g[h], this.decorate && this.decorate(d), c.parentNode.replaceChild(d.cloneNode(!0), c)
            };
            var n = document.importNode;
            Node.prototype.cloneNode = function(a) {
                var b = m.call(this, a);
                return a && f.fixClonedDom(b, this), b
            }, document.importNode = function(a, b) {
                if (a.localName === e) return f.cloneNode(a, b);
                var c = n.call(document, a, b);
                return b && f.fixClonedDom(c, a), c
            }, d && (HTMLTemplateElement.prototype.cloneNode = function(a) {
                return f.cloneNode(this, a)
            })
        }
        c && (window.HTMLTemplateElement = f)
    }(),
    function(a) {
        "use strict";
        if (!window.performance || !window.performance.now) {
            var b = Date.now();
            window.performance = {
                now: function() {
                    return Date.now() - b
                }
            }
        }
        window.requestAnimationFrame || (window.requestAnimationFrame = function() {
            var a = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
            return a ? function(b) {
                return a(function() {
                    b(performance.now())
                })
            } : function(a) {
                return window.setTimeout(a, 1e3 / 60)
            }
        }()), window.cancelAnimationFrame || (window.cancelAnimationFrame = function() {
            return window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function(a) {
                clearTimeout(a)
            }
        }());
        var c = function() {
            var a = document.createEvent("Event");
            return a.initEvent("foo", !0, !0), a.preventDefault(), a.defaultPrevented
        }();
        if (!c) {
            var d = Event.prototype.preventDefault;
            Event.prototype.preventDefault = function() {
                this.cancelable && (d.call(this), Object.defineProperty(this, "defaultPrevented", {
                    get: function() {
                        return !0
                    },
                    configurable: !0
                }))
            }
        }
        var e = /Trident/.test(navigator.userAgent);
        if ((!window.CustomEvent || e && "function" != typeof window.CustomEvent) && (window.CustomEvent = function(a, b) {
                b = b || {};
                var c = document.createEvent("CustomEvent");
                return c.initCustomEvent(a, Boolean(b.bubbles), Boolean(b.cancelable), b.detail), c
            }, window.CustomEvent.prototype = window.Event.prototype), !window.Event || e && "function" != typeof window.Event) {
            var f = window.Event;
            window.Event = function(a, b) {
                b = b || {};
                var c = document.createEvent("Event");
                return c.initEvent(a, Boolean(b.bubbles), Boolean(b.cancelable)), c
            }, window.Event.prototype = f.prototype
        }
    }(window.WebComponents), window.HTMLImports = window.HTMLImports || {
        flags: {}
    },
    function(a) {
        function b(a, b) {
            b = b || o, d(function() {
                f(a, b)
            }, b)
        }

        function c(a) {
            return "complete" === a.readyState || a.readyState === r
        }

        function d(a, b) {
            if (c(b)) a && a();
            else {
                var e = function() {
                    "complete" !== b.readyState && b.readyState !== r || (b.removeEventListener(s, e), d(a, b))
                };
                b.addEventListener(s, e)
            }
        }

        function e(a) {
            a.target.__loaded = !0
        }

        function f(a, b) {
            function c() {
                i == j && a && a({
                    allImports: h,
                    loadedImports: k,
                    errorImports: l
                })
            }

            function d(a) {
                e(a), k.push(this), i++, c()
            }

            function f(a) {
                l.push(this), i++, c()
            }
            var h = b.querySelectorAll("link[rel=import]"),
                i = 0,
                j = h.length,
                k = [],
                l = [];
            if (j)
                for (var m, n = 0; j > n && (m = h[n]); n++) g(m) ? (k.push(this), i++, c()) : (m.addEventListener("load", d), m.addEventListener("error", f));
            else c()
        }

        function g(a) {
            return l ? a.__loaded || a["import"] && "loading" !== a["import"].readyState : a.__importParsed
        }

        function h(a) {
            for (var b, c = 0, d = a.length; d > c && (b = a[c]); c++) i(b) && j(b)
        }

        function i(a) {
            return "link" === a.localName && "import" === a.rel
        }

        function j(a) {
            var b = a["import"];
            b ? e({
                target: a
            }) : (a.addEventListener("load", e), a.addEventListener("error", e))
        }
        var k = "import",
            l = Boolean(k in document.createElement("link")),
            m = Boolean(window.ShadowDOMPolyfill),
            n = function(a) {
                return m ? window.ShadowDOMPolyfill.wrapIfNeeded(a) : a
            },
            o = n(document),
            p = {
                get: function() {
                    var a = window.HTMLImports.currentScript || document.currentScript || ("complete" !== document.readyState ? document.scripts[document.scripts.length - 1] : null);
                    return n(a)
                },
                configurable: !0
            };
        Object.defineProperty(document, "_currentScript", p), Object.defineProperty(o, "_currentScript", p);
        var q = /Trident/.test(navigator.userAgent),
            r = q ? "complete" : "interactive",
            s = "readystatechange";
        l && (new MutationObserver(function(a) {
            for (var b, c = 0, d = a.length; d > c && (b = a[c]); c++) b.addedNodes && h(b.addedNodes)
        }).observe(document.head, {
            childList: !0
        }), function() {
            if ("loading" === document.readyState)
                for (var a, b = document.querySelectorAll("link[rel=import]"), c = 0, d = b.length; d > c && (a = b[c]); c++) j(a)
        }()), b(function(a) {
            window.HTMLImports.ready = !0, window.HTMLImports.readyTime = (new Date).getTime();
            var b = o.createEvent("CustomEvent");
            b.initCustomEvent("HTMLImportsLoaded", !0, !0, a), o.dispatchEvent(b)
        }), a.IMPORT_LINK_TYPE = k, a.useNative = l, a.rootDocument = o, a.whenReady = b, a.isIE = q
    }(window.HTMLImports),
    function(a) {
        var b = [],
            c = function(a) {
                b.push(a)
            },
            d = function() {
                b.forEach(function(b) {
                    b(a)
                })
            };
        a.addModule = c, a.initializeModules = d
    }(window.HTMLImports), window.HTMLImports.addModule(function(a) {
        var b = /(url\()([^)]*)(\))/g,
            c = /(@import[\s]+(?!url\())([^;]*)(;)/g,
            d = {
                resolveUrlsInStyle: function(a, b) {
                    var c = a.ownerDocument,
                        d = c.createElement("a");
                    return a.textContent = this.resolveUrlsInCssText(a.textContent, b, d), a
                },
                resolveUrlsInCssText: function(a, d, e) {
                    var f = this.replaceUrls(a, e, d, b);
                    return f = this.replaceUrls(f, e, d, c)
                },
                replaceUrls: function(a, b, c, d) {
                    return a.replace(d, function(a, d, e, f) {
                        var g = e.replace(/["']/g, "");
                        return c && (g = new URL(g, c).href), b.href = g, g = b.href, d + "'" + g + "'" + f
                    })
                }
            };
        a.path = d
    }), window.HTMLImports.addModule(function(a) {
        var b = {
            async: !0,
            ok: function(a) {
                return a.status >= 200 && a.status < 300 || 304 === a.status || 0 === a.status
            },
            load: function(c, d, e) {
                var f = new XMLHttpRequest;
                return (a.flags.debug || a.flags.bust) && (c += "?" + Math.random()), f.open("GET", c, b.async), f.addEventListener("readystatechange", function(a) {
                    if (4 === f.readyState) {
                        var c = null;
                        try {
                            var g = f.getResponseHeader("Location");
                            g && (c = "/" === g.substr(0, 1) ? location.origin + g : g)
                        } catch (a) {
                            console.error(a.message)
                        }
                        d.call(e, !b.ok(f) && f, f.response || f.responseText, c)
                    }
                }), f.send(), f
            },
            loadDocument: function(a, b, c) {
                this.load(a, b, c).responseType = "document"
            }
        };
        a.xhr = b
    }), window.HTMLImports.addModule(function(a) {
        var b = a.xhr,
            c = a.flags,
            d = function(a, b) {
                this.cache = {}, this.onload = a, this.oncomplete = b, this.inflight = 0, this.pending = {}
            };
        d.prototype = {
            addNodes: function(a) {
                this.inflight += a.length;
                for (var b, c = 0, d = a.length; d > c && (b = a[c]); c++) this.require(b);
                this.checkDone()
            },
            addNode: function(a) {
                this.inflight++, this.require(a), this.checkDone()
            },
            require: function(a) {
                var b = a.src || a.href;
                a.__nodeUrl = b, this.dedupe(b, a) || this.fetch(b, a)
            },
            dedupe: function(a, b) {
                if (this.pending[a]) return this.pending[a].push(b), !0;
                return this.cache[a] ? (this.onload(a, b, this.cache[a]), this.tail(), !0) : (this.pending[a] = [b], !1)
            },
            fetch: function(a, d) {
                if (c.load && console.log("fetch", a, d), a)
                    if (a.match(/^data:/)) {
                        var e = a.split(","),
                            f = e[0],
                            g = e[1];
                        g = f.indexOf(";base64") > -1 ? atob(g) : decodeURIComponent(g), setTimeout(function() {
                            this.receive(a, d, null, g)
                        }.bind(this), 0)
                    } else {
                        var h = function(b, c, e) {
                            this.receive(a, d, b, c, e)
                        }.bind(this);
                        b.load(a, h)
                    }
                else setTimeout(function() {
                    this.receive(a, d, {
                        error: "href must be specified"
                    }, null)
                }.bind(this), 0)
            },
            receive: function(a, b, c, d, e) {
                this.cache[a] = d;
                for (var f, g = this.pending[a], h = 0, i = g.length; i > h && (f = g[h]); h++) this.onload(a, f, d, c, e), this.tail();
                this.pending[a] = null
            },
            tail: function() {
                --this.inflight, this.checkDone()
            },
            checkDone: function() {
                this.inflight || this.oncomplete()
            }
        }, a.Loader = d
    }), window.HTMLImports.addModule(function(a) {
        var b = function(a) {
            this.addCallback = a, this.mo = new MutationObserver(this.handler.bind(this))
        };
        b.prototype = {
            handler: function(a) {
                for (var b, c = 0, d = a.length; d > c && (b = a[c]); c++) "childList" === b.type && b.addedNodes.length && this.addedNodes(b.addedNodes)
            },
            addedNodes: function(a) {
                this.addCallback && this.addCallback(a);
                for (var b, c = 0, d = a.length; d > c && (b = a[c]); c++) b.children && b.children.length && this.addedNodes(b.children)
            },
            observe: function(a) {
                this.mo.observe(a, {
                    childList: !0,
                    subtree: !0
                })
            }
        }, a.Observer = b
    }), window.HTMLImports.addModule(function(a) {
        function b(a) {
            return "link" === a.localName && a.rel === k
        }

        function c(a) {
            var b = d(a);
            return "data:text/javascript;charset=utf-8," + encodeURIComponent(b)
        }

        function d(a) {
            return a.textContent + e(a)
        }

        function e(a) {
            var b = a.ownerDocument;
            b.__importedScripts = b.__importedScripts || 0;
            var c = a.ownerDocument.baseURI,
                d = b.__importedScripts ? "-" + b.__importedScripts : "";
            return b.__importedScripts++, "\n//# sourceURL=" + c + d + ".js\n"
        }

        function f(a) {
            var b = a.ownerDocument.createElement("style");
            return b.textContent = a.textContent, g.resolveUrlsInStyle(b), b
        }
        var g = a.path,
            h = a.rootDocument,
            i = a.flags,
            j = a.isIE,
            k = a.IMPORT_LINK_TYPE,
            l = "link[rel=" + k + "]",
            m = {
                documentSelectors: l,
                importsSelectors: [l, "link[rel=stylesheet]:not([type])", "style:not([type])", "script:not([type])", 'script[type="application/javascript"]', 'script[type="text/javascript"]'].join(","),
                map: {
                    link: "parseLink",
                    script: "parseScript",
                    style: "parseStyle"
                },
                dynamicElements: [],
                parseNext: function() {
                    var a = this.nextToParse();
                    a && this.parse(a)
                },
                parse: function(a) {
                    if (this.isParsed(a)) return void(i.parse && console.log("[%s] is already parsed", a.localName));
                    var b = this[this.map[a.localName]];
                    b && (this.markParsing(a), b.call(this, a))
                },
                parseDynamic: function(a, b) {
                    this.dynamicElements.push(a), b || this.parseNext()
                },
                markParsing: function(a) {
                    i.parse && console.log("parsing", a), this.parsingElement = a
                },
                markParsingComplete: function(a) {
                    a.__importParsed = !0, this.markDynamicParsingComplete(a), a.__importElement && (a.__importElement.__importParsed = !0, this.markDynamicParsingComplete(a.__importElement)), this.parsingElement = null, i.parse && console.log("completed", a)
                },
                markDynamicParsingComplete: function(a) {
                    var b = this.dynamicElements.indexOf(a);
                    b >= 0 && this.dynamicElements.splice(b, 1)
                },
                parseImport: function(a) {
                    if (a["import"] = a.__doc, window.HTMLImports.__importsParsingHook && window.HTMLImports.__importsParsingHook(a), a["import"] && (a["import"].__importParsed = !0), this.markParsingComplete(a), a.__resource && !a.__error ? a.dispatchEvent(new CustomEvent("load", {
                            bubbles: !1
                        })) : a.dispatchEvent(new CustomEvent("error", {
                            bubbles: !1
                        })), a.__pending)
                        for (var b; a.__pending.length;) b = a.__pending.shift(), b && b({
                            target: a
                        });
                    this.parseNext()
                },
                parseLink: function(a) {
                    b(a) ? this.parseImport(a) : (a.href = a.href, this.parseGeneric(a))
                },
                parseStyle: function(a) {
                    var b = a;
                    a = f(a), b.__appliedElement = a, a.__importElement = b, this.parseGeneric(a)
                },
                parseGeneric: function(a) {
                    this.trackElement(a), this.addElementToDocument(a)
                },
                rootImportForElement: function(a) {
                    for (var b = a; b.ownerDocument.__importLink;) b = b.ownerDocument.__importLink;
                    return b
                },
                addElementToDocument: function(a) {
                    var b = this.rootImportForElement(a.__importElement || a);
                    b.parentNode.insertBefore(a, b)
                },
                trackElement: function(a, b) {
                    var c = this,
                        d = function(e) {
                            a.removeEventListener("load", d), a.removeEventListener("error", d), b && b(e), c.markParsingComplete(a), c.parseNext()
                        };
                    if (a.addEventListener("load", d), a.addEventListener("error", d), j && "style" === a.localName) {
                        var e = !1;
                        if (-1 == a.textContent.indexOf("@import")) e = !0;
                        else if (a.sheet) {
                            e = !0;
                            for (var f, g = a.sheet.cssRules, h = g ? g.length : 0, i = 0; h > i && (f = g[i]); i++) f.type === CSSRule.IMPORT_RULE && (e = e && Boolean(f.styleSheet))
                        }
                        e && setTimeout(function() {
                            a.dispatchEvent(new CustomEvent("load", {
                                bubbles: !1
                            }))
                        })
                    }
                },
                parseScript: function(b) {
                    var d = document.createElement("script");
                    d.__importElement = b, d.src = b.src ? b.src : c(b), a.currentScript = b, this.trackElement(d, function(b) {
                        d.parentNode && d.parentNode.removeChild(d), a.currentScript = null
                    }), this.addElementToDocument(d)
                },
                nextToParse: function() {
                    return this._mayParse = [], !this.parsingElement && (this.nextToParseInDoc(h) || this.nextToParseDynamic())
                },
                nextToParseInDoc: function(a, c) {
                    if (a && this._mayParse.indexOf(a) < 0) {
                        this._mayParse.push(a);
                        for (var d, e = a.querySelectorAll(this.parseSelectorsForNode(a)), f = 0, g = e.length; g > f && (d = e[f]); f++)
                            if (!this.isParsed(d)) return this.hasResource(d) ? b(d) ? this.nextToParseInDoc(d.__doc, d) : d : void 0
                    }
                    return c
                },
                nextToParseDynamic: function() {
                    return this.dynamicElements[0]
                },
                parseSelectorsForNode: function(a) {
                    var b = a.ownerDocument || a;
                    return b === h ? this.documentSelectors : this.importsSelectors
                },
                isParsed: function(a) {
                    return a.__importParsed
                },
                needsDynamicParsing: function(a) {
                    return this.dynamicElements.indexOf(a) >= 0
                },
                hasResource: function(a) {
                    return !b(a) || void 0 !== a.__doc
                }
            };
        a.parser = m, a.IMPORT_SELECTOR = l
    }), window.HTMLImports.addModule(function(a) {
        function b(a) {
            return c(a, g)
        }

        function c(a, b) {
            return "link" === a.localName && a.getAttribute("rel") === b
        }

        function d(a) {
            return !!Object.getOwnPropertyDescriptor(a, "baseURI")
        }

        function e(a, b) {
            var c = document.implementation.createHTMLDocument(g);
            c._URL = b;
            var e = c.createElement("base");
            e.setAttribute("href", b), c.baseURI || d(c) || Object.defineProperty(c, "baseURI", {
                value: b
            });
            var f = c.createElement("meta");
            return f.setAttribute("charset", "utf-8"), c.head.appendChild(f), c.head.appendChild(e), c.body.innerHTML = a, window.HTMLTemplateElement && HTMLTemplateElement.bootstrap && HTMLTemplateElement.bootstrap(c), c
        }
        var f = a.flags,
            g = a.IMPORT_LINK_TYPE,
            h = a.IMPORT_SELECTOR,
            i = a.rootDocument,
            j = a.Loader,
            k = a.Observer,
            l = a.parser,
            m = {
                documents: {},
                documentPreloadSelectors: h,
                importsPreloadSelectors: [h].join(","),
                loadNode: function(a) {
                    n.addNode(a)
                },
                loadSubtree: function(a) {
                    var b = this.marshalNodes(a);
                    n.addNodes(b)
                },
                marshalNodes: function(a) {
                    return a.querySelectorAll(this.loadSelectorsForNode(a))
                },
                loadSelectorsForNode: function(a) {
                    var b = a.ownerDocument || a;
                    return b === i ? this.documentPreloadSelectors : this.importsPreloadSelectors
                },
                loaded: function(a, c, d, g, h) {
                    if (f.load && console.log("loaded", a, c), c.__resource = d, c.__error = g, b(c)) {
                        var i = this.documents[a];
                        void 0 === i && (i = g ? null : e(d, h || a), i && (i.__importLink = c, this.bootDocument(i)), this.documents[a] = i), c.__doc = i
                    }
                    l.parseNext()
                },
                bootDocument: function(a) {
                    this.loadSubtree(a), this.observer.observe(a), l.parseNext()
                },
                loadedAll: function() {
                    l.parseNext()
                }
            },
            n = new j(m.loaded.bind(m), m.loadedAll.bind(m));
        if (m.observer = new k, !document.baseURI) {
            var o = {
                get: function() {
                    var a = document.querySelector("base");
                    return a ? a.href : window.location.href
                },
                configurable: !0
            };
            Object.defineProperty(document, "baseURI", o), Object.defineProperty(i, "baseURI", o)
        }
        a.importer = m, a.importLoader = n
    }), window.HTMLImports.addModule(function(a) {
        var b = a.parser,
            c = a.importer,
            d = {
                added: function(a) {
                    for (var d, e, f, g, h = 0, i = a.length; i > h && (g = a[h]); h++) d || (d = g.ownerDocument, e = b.isParsed(d)), f = this.shouldLoadNode(g), f && c.loadNode(g), this.shouldParseNode(g) && e && b.parseDynamic(g, f)
                },
                shouldLoadNode: function(a) {
                    return 1 === a.nodeType && e.call(a, c.loadSelectorsForNode(a))
                },
                shouldParseNode: function(a) {
                    return 1 === a.nodeType && e.call(a, b.parseSelectorsForNode(a))
                }
            };
        c.observer.addCallback = d.added.bind(d);
        var e = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector
    }),
    function(a) {
        function b() {
            window.HTMLImports.importer.bootDocument(d)
        }
        var c = a.initializeModules;
        a.isIE;
        if (!a.useNative) {
            c();
            var d = a.rootDocument;
            "complete" === document.readyState || "interactive" === document.readyState && !window.attachEvent ? b() : document.addEventListener("DOMContentLoaded", b)
        }
    }(window.HTMLImports), window.CustomElements = window.CustomElements || {
        flags: {}
    },
    function(a) {
        var b = a.flags,
            c = [],
            d = function(a) {
                c.push(a)
            },
            e = function() {
                c.forEach(function(b) {
                    b(a)
                })
            };
        a.addModule = d, a.initializeModules = e, a.hasNative = Boolean(document.registerElement), a.isIE = /Trident/.test(navigator.userAgent), a.useNative = !b.register && a.hasNative && !window.ShadowDOMPolyfill && (!window.HTMLImports || window.HTMLImports.useNative)
    }(window.CustomElements), window.CustomElements.addModule(function(a) {
        function b(a, b) {
            c(a, function(a) {
                return b(a) ? !0 : void d(a, b)
            }), d(a, b)
        }

        function c(a, b, d) {
            var e = a.firstElementChild;
            if (!e)
                for (e = a.firstChild; e && e.nodeType !== Node.ELEMENT_NODE;) e = e.nextSibling;
            for (; e;) b(e, d) !== !0 && c(e, b, d), e = e.nextElementSibling;
            return null
        }

        function d(a, c) {
            for (var d = a.shadowRoot; d;) b(d, c), d = d.olderShadowRoot
        }

        function e(a, b) {
            f(a, b, [])
        }

        function f(a, b, c) {
            if (a = window.wrap(a), !(c.indexOf(a) >= 0)) {
                c.push(a);
                for (var d, e = a.querySelectorAll("link[rel=" + g + "]"), h = 0, i = e.length; i > h && (d = e[h]); h++) d["import"] && f(d["import"], b, c);
                b(a)
            }
        }
        var g = window.HTMLImports ? window.HTMLImports.IMPORT_LINK_TYPE : "none";
        a.forDocumentTree = e, a.forSubtree = b
    }), window.CustomElements.addModule(function(a) {
        function b(a, b) {
            return c(a, b) || d(a, b)
        }

        function c(b, c) {
            return a.upgrade(b, c) ? !0 : void(c && g(b))
        }

        function d(a, b) {
            t(a, function(a) {
                return c(a, b) ? !0 : void 0
            })
        }

        function e(a) {
            x.push(a), w || (w = !0, setTimeout(f))
        }

        function f() {
            w = !1;
            for (var a, b = x, c = 0, d = b.length; d > c && (a = b[c]); c++) a();
            x = []
        }

        function g(a) {
            v ? e(function() {
                h(a)
            }) : h(a)
        }

        function h(a) {
            a.__upgraded__ && !a.__attached && (a.__attached = !0, a.attachedCallback && a.attachedCallback())
        }

        function i(a) {
            j(a), t(a, function(a) {
                j(a)
            })
        }

        function j(a) {
            v ? e(function() {
                k(a)
            }) : k(a)
        }

        function k(a) {
            a.__upgraded__ && a.__attached && (a.__attached = !1, a.detachedCallback && a.detachedCallback())
        }

        function l(a) {
            for (var b = a, c = window.wrap(document); b;) {
                if (b == c) return !0;
                b = b.parentNode || b.nodeType === Node.DOCUMENT_FRAGMENT_NODE && b.host
            }
        }

        function m(a) {
            if (a.shadowRoot && !a.shadowRoot.__watched) {
                s.dom && console.log("watching shadow-root for: ", a.localName);
                for (var b = a.shadowRoot; b;) p(b), b = b.olderShadowRoot
            }
        }

        function n(a, c) {
            if (s.dom) {
                var d = c[0];
                if (d && "childList" === d.type && d.addedNodes && d.addedNodes) {
                    for (var e = d.addedNodes[0]; e && e !== document && !e.host;) e = e.parentNode;
                    var f = e && (e.URL || e._URL || e.host && e.host.localName) || "";
                    f = f.split("/?").shift().split("/").pop()
                }
                console.group("mutations (%d) [%s]", c.length, f || "")
            }
            var g = l(a);
            c.forEach(function(a) {
                "childList" === a.type && (y(a.addedNodes, function(a) {
                    a.localName && b(a, g)
                }), y(a.removedNodes, function(a) {
                    a.localName && i(a)
                }))
            }), s.dom && console.groupEnd()
        }

        function o(a) {
            for (a = window.wrap(a), a || (a = window.wrap(document)); a.parentNode;) a = a.parentNode;
            var b = a.__observer;
            b && (n(a, b.takeRecords()), f())
        }

        function p(a) {
            if (!a.__observer) {
                var b = new MutationObserver(n.bind(this, a));
                b.observe(a, {
                    childList: !0,
                    subtree: !0
                }), a.__observer = b
            }
        }

        function q(a) {
            a = window.wrap(a), s.dom && console.group("upgradeDocument: ", a.baseURI.split("/").pop());
            var c = a === window.wrap(document);
            b(a, c), p(a), s.dom && console.groupEnd()
        }

        function r(a) {
            u(a, q)
        }
        var s = a.flags,
            t = a.forSubtree,
            u = a.forDocumentTree,
            v = window.MutationObserver._isPolyfilled && s["throttle-attached"];
        a.hasPolyfillMutations = v, a.hasThrottledAttached = v;
        var w = !1,
            x = [],
            y = Array.prototype.forEach.call.bind(Array.prototype.forEach),
            z = Element.prototype.createShadowRoot;
        z && (Element.prototype.createShadowRoot = function() {
            var a = z.call(this);
            return window.CustomElements.watchShadow(this), a
        }), a.watchShadow = m, a.upgradeDocumentTree = r, a.upgradeDocument = q, a.upgradeSubtree = d, a.upgradeAll = b, a.attached = g, a.takeRecords = o
    }), window.CustomElements.addModule(function(a) {
        function b(b, d) {
            if ("template" === b.localName && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(b), !b.__upgraded__ && b.nodeType === Node.ELEMENT_NODE) {
                var e = b.getAttribute("is"),
                    f = a.getRegisteredDefinition(b.localName) || a.getRegisteredDefinition(e);
                if (f && (e && f.tag == b.localName || !e && !f["extends"])) return c(b, f, d)
            }
        }

        function c(b, c, e) {
            return g.upgrade && console.group("upgrade:", b.localName), c.is && b.setAttribute("is", c.is), d(b, c), b.__upgraded__ = !0, f(b), e && a.attached(b), a.upgradeSubtree(b, e), g.upgrade && console.groupEnd(), b
        }

        function d(a, b) {
            Object.__proto__ ? a.__proto__ = b.prototype : (e(a, b.prototype, b["native"]), a.__proto__ = b.prototype)
        }

        function e(a, b, c) {
            for (var d = {}, e = b; e !== c && e !== HTMLElement.prototype;) {
                for (var f, g = Object.getOwnPropertyNames(e), h = 0; f = g[h]; h++) d[f] || (Object.defineProperty(a, f, Object.getOwnPropertyDescriptor(e, f)), d[f] = 1);
                e = Object.getPrototypeOf(e)
            }
        }

        function f(a) {
            a.createdCallback && a.createdCallback()
        }
        var g = a.flags;
        a.upgrade = b, a.upgradeWithDefinition = c, a.implementPrototype = d
    }), window.CustomElements.addModule(function(a) {
        function b(b, d) {
            var i = d || {};
            if (!b) throw new Error("document.registerElement: first argument `name` must not be empty");
            if (b.indexOf("-") < 0) throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '" + String(b) + "'.");
            if (e(b)) throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '" + String(b) + "'. The type name is invalid.");
            if (j(b)) throw new Error("DuplicateDefinitionError: a type with name '" + String(b) + "' is already registered");
            return i.prototype || (i.prototype = Object.create(HTMLElement.prototype)), i.__name = b.toLowerCase(), i["extends"] && (i["extends"] = i["extends"].toLowerCase()), i.lifecycle = i.lifecycle || {}, i.ancestry = f(i["extends"]), g(i), h(i), c(i.prototype), k(i.__name, i), i.ctor = l(i), i.ctor.prototype = i.prototype, i.prototype.constructor = i.ctor, a.ready && q(document), i.ctor
        }

        function c(a) {
            if (!a.setAttribute._polyfilled) {
                var b = a.setAttribute;
                a.setAttribute = function(a, c) {
                    d.call(this, a, c, b)
                };
                var c = a.removeAttribute;
                a.removeAttribute = function(a) {
                    d.call(this, a, null, c)
                }, a.setAttribute._polyfilled = !0
            }
        }

        function d(a, b, c) {
            a = a.toLowerCase();
            var d = this.getAttribute(a);
            c.apply(this, arguments);
            var e = this.getAttribute(a);
            this.attributeChangedCallback && e !== d && this.attributeChangedCallback(a, d, e)
        }

        function e(a) {
            for (var b = 0; b < v.length; b++)
                if (a === v[b]) return !0
        }

        function f(a) {
            var b = j(a);
            return b ? f(b["extends"]).concat([b]) : []
        }

        function g(a) {
            for (var b, c = a["extends"], d = 0; b = a.ancestry[d]; d++) c = b.is && b.tag;
            a.tag = c || a.__name, c && (a.is = a.__name)
        }

        function h(a) {
            if (!Object.__proto__) {
                var b = HTMLElement.prototype;
                if (a.is) {
                    var c = document.createElement(a.tag);
                    b = Object.getPrototypeOf(c)
                }
                for (var d, e = a.prototype, f = !1; e;) e == b && (f = !0), d = Object.getPrototypeOf(e), d && (e.__proto__ = d), e = d;
                f || console.warn(a.tag + " prototype not found in prototype chain for " + a.is), a["native"] = b
            }
        }

        function i(a) {
            return s(y(a.tag), a)
        }

        function j(a) {
            return a ? w[a.toLowerCase()] : void 0
        }

        function k(a, b) {
            w[a] = b
        }

        function l(a) {
            return function() {
                return i(a)
            }
        }

        function m(a, b, c) {
            return a === x ? n(b, c) : z(a, b)
        }

        function n(a, b) {
            a && (a = a.toLowerCase()), b && (b = b.toLowerCase());
            var c = j(b || a);
            if (c) {
                if (a == c.tag && b == c.is) return new c.ctor;
                if (!b && !c.is) return new c.ctor
            }
            var d;
            return b ? (d = n(a), d.setAttribute("is", b), d) : (d = y(a), a.indexOf("-") >= 0 && t(d, HTMLElement), d)
        }

        function o(a, b) {
            var c = a[b];
            a[b] = function() {
                var a = c.apply(this, arguments);
                return r(a), a
            }
        }
        var p, q = (a.isIE, a.upgradeDocumentTree),
            r = a.upgradeAll,
            s = a.upgradeWithDefinition,
            t = a.implementPrototype,
            u = a.useNative,
            v = ["annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph"],
            w = {},
            x = "http://www.w3.org/1999/xhtml",
            y = document.createElement.bind(document),
            z = document.createElementNS.bind(document);
        p = Object.__proto__ || u ? function(a, b) {
            return a instanceof b
        } : function(a, b) {
            if (a instanceof b) return !0;
            for (var c = a; c;) {
                if (c === b.prototype) return !0;
                c = c.__proto__
            }
            return !1
        }, o(Node.prototype, "cloneNode"), o(document, "importNode"), document.registerElement = b, document.createElement = n, document.createElementNS = m, a.registry = w, a["instanceof"] = p, a.reservedTagList = v, a.getRegisteredDefinition = j, document.register = document.registerElement
    }),
    function(a) {
        function b() {
            f(window.wrap(document)), window.CustomElements.ready = !0;
            var a = window.requestAnimationFrame || function(a) {
                setTimeout(a, 16)
            };
            a(function() {
                setTimeout(function() {
                    window.CustomElements.readyTime = Date.now(), window.HTMLImports && (window.CustomElements.elapsed = window.CustomElements.readyTime - window.HTMLImports.readyTime), document.dispatchEvent(new CustomEvent("WebComponentsReady", {
                        bubbles: !0
                    }))
                })
            })
        }
        var c = a.useNative,
            d = a.initializeModules;
        a.isIE;
        if (c) {
            var e = function() {};
            a.watchShadow = e, a.upgrade = e, a.upgradeAll = e, a.upgradeDocumentTree = e, a.upgradeSubtree = e, a.takeRecords = e, a["instanceof"] = function(a, b) {
                return a instanceof b
            }
        } else d();
        var f = a.upgradeDocumentTree,
            g = a.upgradeDocument;
        if (window.wrap || (window.ShadowDOMPolyfill ? (window.wrap = window.ShadowDOMPolyfill.wrapIfNeeded, window.unwrap = window.ShadowDOMPolyfill.unwrapIfNeeded) : window.wrap = window.unwrap = function(a) {
                return a
            }), window.HTMLImports && (window.HTMLImports.__importsParsingHook = function(a) {
                a["import"] && g(wrap(a["import"]))
            }), "complete" === document.readyState || a.flags.eager) b();
        else if ("interactive" !== document.readyState || window.attachEvent || window.HTMLImports && !window.HTMLImports.ready) {
            var h = window.HTMLImports && !window.HTMLImports.ready ? "HTMLImportsLoaded" : "DOMContentLoaded";
            window.addEventListener(h, b)
        } else b()
    }(window.CustomElements),
    function(a) {
        var b = document.createElement("style");
        b.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";
        var c = document.querySelector("head");
        c.insertBefore(b, c.firstChild)
    }(window.WebComponents),
    function() {
        function a() {
            document.body.removeAttribute("unresolved")
        }
        window.WebComponents ? addEventListener("WebComponentsReady", a) : "interactive" === document.readyState || "complete" === document.readyState ? a() : addEventListener("DOMContentLoaded", a)
    }(), window.Polymer = {
        Settings: function() {
            for (var a, b = window.Polymer || {}, c = location.search.slice(1).split("&"), d = 0; d < c.length && (a = c[d]); d++) a = a.split("="), a[0] && (b[a[0]] = a[1] || !0);
            var e = "shadow" === b.dom,
                f = Boolean(Element.prototype.createShadowRoot),
                g = f && !window.ShadowDOMPolyfill,
                h = e && f,
                i = Boolean("import" in document.createElement("link")),
                j = i,
                k = !window.CustomElements || window.CustomElements.useNative;
            return {
                wantShadow: e,
                hasShadow: f,
                nativeShadow: g,
                useShadow: h,
                useNativeShadow: h && g,
                useNativeImports: j,
                useNativeCustomElements: k
            }
        }()
    },
    function() {
        var a = window.Polymer;
        window.Polymer = function(a) {
            "function" == typeof a && (a = a.prototype), a || (a = {});
            var c = b(a);
            a = c.prototype;
            var d = {
                prototype: a
            };
            return a["extends"] && (d["extends"] = a["extends"]), Polymer.telemetry._registrate(a), document.registerElement(a.is, d), c
        };
        var b = function(a) {
            var b = Polymer.Base;
            return a["extends"] && (b = Polymer.Base._getExtendedPrototype(a["extends"])), a = Polymer.Base.chainObject(a, b), a.registerCallback(), a.constructor
        };
        if (window.Polymer = Polymer, a)
            for (var c in a) Polymer[c] = a[c];
        Polymer.Class = b
    }(), Polymer.telemetry = {
        registrations: [],
        _regLog: function(a) {
            console.log("[" + a.is + "]: registered")
        },
        _registrate: function(a) {
            this.registrations.push(a), Polymer.log && this._regLog(a)
        },
        dumpRegistrations: function() {
            this.registrations.forEach(this._regLog)
        }
    }, Object.defineProperty(window, "currentImport", {
        enumerable: !0,
        configurable: !0,
        get: function() {
            return (document._currentScript || document.currentScript).ownerDocument
        }
    }), Polymer.RenderStatus = {
        _ready: !1,
        _callbacks: [],
        whenReady: function(a) {
            this._ready ? a() : this._callbacks.push(a)
        },
        _makeReady: function() {
            this._ready = !0;
            for (var a = 0; a < this._callbacks.length; a++) this._callbacks[a]();
            this._callbacks = []
        },
        _catchFirstRender: function() {
            requestAnimationFrame(function() {
                Polymer.RenderStatus._makeReady()
            })
        },
        _afterNextRenderQueue: [],
        _waitingNextRender: !1,
        afterNextRender: function(a, b, c) {
            this._watchNextRender(), this._afterNextRenderQueue.push([a, b, c])
        },
        _watchNextRender: function() {
            if (!this._waitingNextRender) {
                this._waitingNextRender = !0;
                var a = function() {
                    Polymer.RenderStatus._flushNextRender()
                };
                this._ready ? requestAnimationFrame(a) : this.whenReady(a)
            }
        },
        _flushNextRender: function() {
            var a = this;
            setTimeout(function() {
                a._flushRenderCallbacks(a._afterNextRenderQueue), a._afterNextRenderQueue = [], a._waitingNextRender = !1
            })
        },
        _flushRenderCallbacks: function(a) {
            for (var b, c = 0; c < a.length; c++) b = a[c], b[1].apply(b[0], b[2] || Polymer.nar)
        }
    }, window.HTMLImports ? HTMLImports.whenReady(function() {
        Polymer.RenderStatus._catchFirstRender()
    }) : Polymer.RenderStatus._catchFirstRender(), Polymer.ImportStatus = Polymer.RenderStatus, Polymer.ImportStatus.whenLoaded = Polymer.ImportStatus.whenReady, Polymer.Base = {
        __isPolymerInstance__: !0,
        _addFeature: function(a) {
            this.extend(this, a)
        },
        registerCallback: function() {
            this._desugarBehaviors(), this._doBehavior("beforeRegister"), this._registerFeatures(), this._doBehavior("registered")
        },
        createdCallback: function() {
            Polymer.telemetry.instanceCount++, this.root = this, this._doBehavior("created"), this._initFeatures()
        },
        attachedCallback: function() {
            var a = this;
            Polymer.RenderStatus.whenReady(function() {
                a.isAttached = !0, a._doBehavior("attached")
            })
        },
        detachedCallback: function() {
            this.isAttached = !1, this._doBehavior("detached")
        },
        attributeChangedCallback: function(a, b, c) {
            this._attributeChangedImpl(a), this._doBehavior("attributeChanged", [a, b, c])
        },
        _attributeChangedImpl: function(a) {
            this._setAttributeToProperty(this, a)
        },
        extend: function(a, b) {
            if (a && b)
                for (var c, d = Object.getOwnPropertyNames(b), e = 0; e < d.length && (c = d[e]); e++) this.copyOwnProperty(c, b, a);
            return a || b
        },
        mixin: function(a, b) {
            for (var c in b) a[c] = b[c];
            return a
        },
        copyOwnProperty: function(a, b, c) {
            var d = Object.getOwnPropertyDescriptor(b, a);
            d && Object.defineProperty(c, a, d)
        },
        _log: console.log.apply.bind(console.log, console),
        _warn: console.warn.apply.bind(console.warn, console),
        _error: console.error.apply.bind(console.error, console),
        _logf: function() {
            return this._logPrefix.concat([this.is]).concat(Array.prototype.slice.call(arguments, 0))
        }
    }, Polymer.Base._logPrefix = function() {
        var a = window.chrome || /firefox/i.test(navigator.userAgent);
        return a ? ["%c[%s::%s]:", "font-weight: bold; background-color:#EEEE00;"] : ["[%s::%s]:"]
    }(), Polymer.Base.chainObject = function(a, b) {
        return a && b && a !== b && (Object.__proto__ || (a = Polymer.Base.extend(Object.create(b), a)), a.__proto__ = b), a
    }, Polymer.Base = Polymer.Base.chainObject(Polymer.Base, HTMLElement.prototype), window.CustomElements ? Polymer["instanceof"] = CustomElements["instanceof"] : Polymer["instanceof"] = function(a, b) {
        return a instanceof b
    }, Polymer.isInstance = function(a) {
        return Boolean(a && a.__isPolymerInstance__)
    }, Polymer.telemetry.instanceCount = 0,
    function() {
        function a() {
            if (f)
                for (var a, b = document._currentScript || document.currentScript, c = b && b.ownerDocument || document, d = c.querySelectorAll("dom-module"), e = d.length - 1; e >= 0 && (a = d[e]); e--) {
                    if (a.__upgraded__) return;
                    CustomElements.upgrade(a)
                }
        }
        var b = {},
            c = {},
            d = function(a) {
                return b[a] || c[a.toLowerCase()]
            },
            e = function() {
                return document.createElement("dom-module")
            };
        e.prototype = Object.create(HTMLElement.prototype), Polymer.Base.extend(e.prototype, {
            constructor: e,
            createdCallback: function() {
                this.register()
            },
            register: function(a) {
                var a = a || this.id || this.getAttribute("name") || this.getAttribute("is");
                a && (this.id = a, b[a] = this, c[a.toLowerCase()] = this)
            },
            "import": function(b, c) {
                if (b) {
                    var e = d(b);
                    return e || (a(), e = d(b)), e && c && (e = e.querySelector(c)), e
                }
            }
        });
        var f = window.CustomElements && !CustomElements.useNative;
        document.registerElement("dom-module", e)
    }(), Polymer.Base._addFeature({
        _prepIs: function() {
            if (!this.is) {
                var a = (document._currentScript || document.currentScript).parentNode;
                if ("dom-module" === a.localName) {
                    var b = a.id || a.getAttribute("name") || a.getAttribute("is");
                    this.is = b
                }
            }
            this.is && (this.is = this.is.toLowerCase())
        }
    }), Polymer.Base._addFeature({
        behaviors: [],
        _desugarBehaviors: function() {
            this.behaviors.length && (this.behaviors = this._desugarSomeBehaviors(this.behaviors))
        },
        _desugarSomeBehaviors: function(a) {
            a = this._flattenBehaviorsList(a);
            for (var b = a.length - 1; b >= 0; b--) this._mixinBehavior(a[b]);
            return a
        },
        _flattenBehaviorsList: function(a) {
            for (var b = [], c = 0; c < a.length; c++) {
                var d = a[c];
                d instanceof Array ? b = b.concat(this._flattenBehaviorsList(d)) : d ? b.push(d) : this._warn(this._logf("_flattenBehaviorsList", "behavior is null, check for missing or 404 import"))
            }
            return b
        },
        _mixinBehavior: function(a) {
            for (var b, c = Object.getOwnPropertyNames(a), d = 0; d < c.length && (b = c[d]); d++) Polymer.Base._behaviorProperties[b] || this.hasOwnProperty(b) || this.copyOwnProperty(b, a, this)
        },
        _prepBehaviors: function() {
            this._prepFlattenedBehaviors(this.behaviors)
        },
        _prepFlattenedBehaviors: function(a) {
            for (var b = 0, c = a.length; c > b; b++) this._prepBehavior(a[b]);
            this._prepBehavior(this)
        },
        _doBehavior: function(a, b) {
            for (var c = 0; c < this.behaviors.length; c++) this._invokeBehavior(this.behaviors[c], a, b);
            this._invokeBehavior(this, a, b)
        },
        _invokeBehavior: function(a, b, c) {
            var d = a[b];
            d && d.apply(this, c || Polymer.nar)
        },
        _marshalBehaviors: function() {
            for (var a = 0; a < this.behaviors.length; a++) this._marshalBehavior(this.behaviors[a]);
            this._marshalBehavior(this)
        }
    }), Polymer.Base._behaviorProperties = {
        hostAttributes: !0,
        beforeRegister: !0,
        registered: !0,
        properties: !0,
        observers: !0,
        listeners: !0,
        created: !0,
        attached: !0,
        detached: !0,
        attributeChanged: !0,
        ready: !0
    }, Polymer.Base._addFeature({
        _getExtendedPrototype: function(a) {
            return this._getExtendedNativePrototype(a)
        },
        _nativePrototypes: {},
        _getExtendedNativePrototype: function(a) {
            var b = this._nativePrototypes[a];
            if (!b) {
                var c = this.getNativePrototype(a);
                b = this.extend(Object.create(c), Polymer.Base), this._nativePrototypes[a] = b
            }
            return b
        },
        getNativePrototype: function(a) {
            return Object.getPrototypeOf(document.createElement(a))
        }
    }), Polymer.Base._addFeature({
        _prepConstructor: function() {
            this._factoryArgs = this["extends"] ? [this["extends"], this.is] : [this.is];
            var a = function() {
                return this._factory(arguments)
            };
            this.hasOwnProperty("extends") && (a["extends"] = this["extends"]), Object.defineProperty(this, "constructor", {
                value: a,
                writable: !0,
                configurable: !0
            }), a.prototype = this
        },
        _factory: function(a) {
            var b = document.createElement.apply(document, this._factoryArgs);
            return this.factoryImpl && this.factoryImpl.apply(b, a), b
        }
    }), Polymer.nob = Object.create(null), Polymer.Base._addFeature({
        properties: {},
        getPropertyInfo: function(a) {
            var b = this._getPropertyInfo(a, this.properties);
            if (!b)
                for (var c = 0; c < this.behaviors.length; c++)
                    if (b = this._getPropertyInfo(a, this.behaviors[c].properties)) return b;
            return b || Polymer.nob
        },
        _getPropertyInfo: function(a, b) {
            var c = b && b[a];
            return "function" == typeof c && (c = b[a] = {
                type: c
            }), c && (c.defined = !0), c
        },
        _prepPropertyInfo: function() {
            this._propertyInfo = {};
            for (var a = 0; a < this.behaviors.length; a++) this._addPropertyInfo(this._propertyInfo, this.behaviors[a].properties);
            this._addPropertyInfo(this._propertyInfo, this.properties), this._addPropertyInfo(this._propertyInfo, this._propertyEffects)
        },
        _addPropertyInfo: function(a, b) {
            if (b) {
                var c, d;
                for (var e in b) c = a[e], d = b[e], ("_" !== e[0] || d.readOnly) && (a[e] ? (c.type || (c.type = d.type), c.readOnly || (c.readOnly = d.readOnly)) : a[e] = {
                    type: "function" == typeof d ? d : d.type,
                    readOnly: d.readOnly,
                    attribute: Polymer.CaseMap.camelToDashCase(e)
                })
            }
        }
    }), Polymer.CaseMap = {
        _caseMap: {},
        dashToCamelCase: function(a) {
            var b = Polymer.CaseMap._caseMap[a];
            return b ? b : a.indexOf("-") < 0 ? Polymer.CaseMap._caseMap[a] = a : Polymer.CaseMap._caseMap[a] = a.replace(/-([a-z])/g, function(a) {
                return a[1].toUpperCase()
            })
        },
        camelToDashCase: function(a) {
            var b = Polymer.CaseMap._caseMap[a];
            return b ? b : Polymer.CaseMap._caseMap[a] = a.replace(/([a-z][A-Z])/g, function(a) {
                return a[0] + "-" + a[1].toLowerCase()
            })
        }
    }, Polymer.Base._addFeature({
        _addHostAttributes: function(a) {
            this._aggregatedAttributes || (this._aggregatedAttributes = {}), a && this.mixin(this._aggregatedAttributes, a)
        },
        _marshalHostAttributes: function() {
            this._aggregatedAttributes && this._applyAttributes(this, this._aggregatedAttributes)
        },
        _applyAttributes: function(a, b) {
            for (var c in b)
                if (!this.hasAttribute(c) && "class" !== c) {
                    var d = b[c];
                    this.serializeValueToAttribute(d, c, this)
                }
        },
        _marshalAttributes: function() {
            this._takeAttributesToModel(this)
        },
        _takeAttributesToModel: function(a) {
            if (this.hasAttributes())
                for (var b in this._propertyInfo) {
                    var c = this._propertyInfo[b];
                    this.hasAttribute(c.attribute) && this._setAttributeToProperty(a, c.attribute, b, c)
                }
        },
        _setAttributeToProperty: function(a, b, c, d) {
            if (!this._serializing) {
                var c = c || Polymer.CaseMap.dashToCamelCase(b);
                if (d = d || this._propertyInfo && this._propertyInfo[c], d && !d.readOnly) {
                    var e = this.getAttribute(b);
                    a[c] = this.deserialize(e, d.type)
                }
            }
        },
        _serializing: !1,
        reflectPropertyToAttribute: function(a, b, c) {
            this._serializing = !0, c = void 0 === c ? this[a] : c, this.serializeValueToAttribute(c, b || Polymer.CaseMap.camelToDashCase(a)), this._serializing = !1
        },
        serializeValueToAttribute: function(a, b, c) {
            var d = this.serialize(a);
            c = c || this, void 0 === d ? c.removeAttribute(b) : c.setAttribute(b, d)
        },
        deserialize: function(a, b) {
            switch (b) {
                case Number:
                    a = Number(a);
                    break;
                case Boolean:
                    a = null !== a;
                    break;
                case Object:
                    try {
                        a = JSON.parse(a)
                    } catch (c) {}
                    break;
                case Array:
                    try {
                        a = JSON.parse(a)
                    } catch (c) {
                        a = null, console.warn("Polymer::Attributes: couldn`t decode Array as JSON")
                    }
                    break;
                case Date:
                    a = new Date(a);
                    break;
                case String:
            }
            return a
        },
        serialize: function(a) {
            switch (typeof a) {
                case "boolean":
                    return a ? "" : void 0;
                case "object":
                    if (a instanceof Date) return a;
                    if (a) try {
                        return JSON.stringify(a)
                    } catch (b) {
                        return ""
                    }
                    default: return null != a ? a : void 0
            }
        }
    }), Polymer.version = "1.2.4", Polymer.Base._addFeature({
        _registerFeatures: function() {
            this._prepIs(), this._prepBehaviors(), this._prepConstructor(), this._prepPropertyInfo()
        },
        _prepBehavior: function(a) {
            this._addHostAttributes(a.hostAttributes)
        },
        _marshalBehavior: function(a) {},
        _initFeatures: function() {
            this._marshalHostAttributes(), this._marshalBehaviors()
        }
    }), Polymer.Base._addFeature({
        _prepTemplate: function() {
            void 0 === this._template && (this._template = Polymer.DomModule["import"](this.is, "template")), this._template && this._template.hasAttribute("is") && this._warn(this._logf("_prepTemplate", "top-level Polymer template must not be a type-extension, found", this._template, "Move inside simple <template>.")), this._template && !this._template.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(this._template)
        },
        _stampTemplate: function() {
            this._template && (this.root = this.instanceTemplate(this._template))
        },
        instanceTemplate: function(a) {
            var b = document.importNode(a._content || a.content, !0);
            return b
        }
    }),
    function() {
        var a = Polymer.Base.attachedCallback;
        Polymer.Base._addFeature({
            _hostStack: [],
            ready: function() {},
            _registerHost: function(a) {
                this.dataHost = a = a || Polymer.Base._hostStack[Polymer.Base._hostStack.length - 1], a && a._clients && a._clients.push(this), this._clients = null, this._clientsReadied = !1
            },
            _beginHosting: function() {
                Polymer.Base._hostStack.push(this), this._clients || (this._clients = [])
            },
            _endHosting: function() {
                Polymer.Base._hostStack.pop()
            },
            _tryReady: function() {
                this._readied = !1, this._canReady() && this._ready()
            },
            _canReady: function() {
                return !this.dataHost || this.dataHost._clientsReadied
            },
            _ready: function() {
                this._beforeClientsReady(), this._template && (this._setupRoot(), this._readyClients()), this._clientsReadied = !0, this._clients = null, this._afterClientsReady(), this._readySelf()
            },
            _readyClients: function() {
                this._beginDistribute();
                var a = this._clients;
                if (a)
                    for (var b, c = 0, d = a.length; d > c && (b = a[c]); c++) b._ready();
                this._finishDistribute()
            },
            _readySelf: function() {
                this._doBehavior("ready"), this._readied = !0, this._attachedPending && (this._attachedPending = !1, this.attachedCallback())
            },
            _beforeClientsReady: function() {},
            _afterClientsReady: function() {},
            _beforeAttached: function() {},
            attachedCallback: function() {
                this._readied ? (this._beforeAttached(), a.call(this)) : this._attachedPending = !0
            }
        })
    }(), Polymer.ArraySplice = function() {
        function a(a, b, c) {
            return {
                index: a,
                removed: b,
                addedCount: c
            }
        }

        function b() {}
        var c = 0,
            d = 1,
            e = 2,
            f = 3;
        return b.prototype = {
            calcEditDistances: function(a, b, c, d, e, f) {
                for (var g = f - e + 1, h = c - b + 1, i = new Array(g), j = 0; g > j; j++) i[j] = new Array(h), i[j][0] = j;
                for (var k = 0; h > k; k++) i[0][k] = k;
                for (var j = 1; g > j; j++)
                    for (var k = 1; h > k; k++)
                        if (this.equals(a[b + k - 1], d[e + j - 1])) i[j][k] = i[j - 1][k - 1];
                        else {
                            var l = i[j - 1][k] + 1,
                                m = i[j][k - 1] + 1;
                            i[j][k] = m > l ? l : m
                        }
                return i
            },
            spliceOperationsFromEditDistances: function(a) {
                for (var b = a.length - 1, g = a[0].length - 1, h = a[b][g], i = []; b > 0 || g > 0;)
                    if (0 != b)
                        if (0 != g) {
                            var j, k = a[b - 1][g - 1],
                                l = a[b - 1][g],
                                m = a[b][g - 1];
                            j = m > l ? k > l ? l : k : k > m ? m : k, j == k ? (k == h ? i.push(c) : (i.push(d), h = k), b--, g--) : j == l ? (i.push(f), b--, h = l) : (i.push(e), g--, h = m)
                        } else i.push(f), b--;
                else i.push(e), g--;
                return i.reverse(), i
            },
            calcSplices: function(b, g, h, i, j, k) {
                var l = 0,
                    m = 0,
                    n = Math.min(h - g, k - j);
                if (0 == g && 0 == j && (l = this.sharedPrefix(b, i, n)), h == b.length && k == i.length && (m = this.sharedSuffix(b, i, n - l)), g += l, j += l, h -= m, k -= m, h - g == 0 && k - j == 0) return [];
                if (g == h) {
                    for (var o = a(g, [], 0); k > j;) o.removed.push(i[j++]);
                    return [o]
                }
                if (j == k) return [a(g, [], h - g)];
                for (var p = this.spliceOperationsFromEditDistances(this.calcEditDistances(b, g, h, i, j, k)), o = void 0, q = [], r = g, s = j, t = 0; t < p.length; t++) switch (p[t]) {
                    case c:
                        o && (q.push(o), o = void 0), r++, s++;
                        break;
                    case d:
                        o || (o = a(r, [], 0)), o.addedCount++, r++, o.removed.push(i[s]), s++;
                        break;
                    case e:
                        o || (o = a(r, [], 0)), o.addedCount++, r++;
                        break;
                    case f:
                        o || (o = a(r, [], 0)), o.removed.push(i[s]), s++
                }
                return o && q.push(o), q
            },
            sharedPrefix: function(a, b, c) {
                for (var d = 0; c > d; d++)
                    if (!this.equals(a[d], b[d])) return d;
                return c
            },
            sharedSuffix: function(a, b, c) {
                for (var d = a.length, e = b.length, f = 0; c > f && this.equals(a[--d], b[--e]);) f++;
                return f
            },
            calculateSplices: function(a, b) {
                return this.calcSplices(a, 0, a.length, b, 0, b.length)
            },
            equals: function(a, b) {
                return a === b
            }
        }, new b
    }(), Polymer.domInnerHTML = function() {
        function a(a) {
            switch (a) {
                case "&":
                    return "&amp;";
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case '"':
                    return "&quot;";
                case "Â ":
                    return "&nbsp;"
            }
        }

        function b(b) {
            return b.replace(g, a)
        }

        function c(b) {
            return b.replace(h, a)
        }

        function d(a) {
            for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;
            return b
        }

        function e(a, d, e) {
            switch (a.nodeType) {
                case Node.ELEMENT_NODE:
                    for (var g, h = a.localName, k = "<" + h, l = a.attributes, m = 0; g = l[m]; m++) k += " " + g.name + '="' + b(g.value) + '"';
                    return k += ">", i[h] ? k : k + f(a, e) + "</" + h + ">";
                case Node.TEXT_NODE:
                    var n = a.data;
                    return d && j[d.localName] ? n : c(n);
                case Node.COMMENT_NODE:
                    return "<!--" + a.data + "-->";
                default:
                    throw console.error(a), new Error("not implemented")
            }
        }

        function f(a, b) {
            a instanceof HTMLTemplateElement && (a = a.content);
            for (var c, d = "", f = Polymer.dom(a).childNodes, g = 0, h = f.length; h > g && (c = f[g]); g++) d += e(c, a, b);
            return d
        }
        var g = /[&\u00A0"]/g,
            h = /[&\u00A0<>]/g,
            i = d(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]),
            j = d(["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"]);
        return {
            getInnerHTML: f
        }
    }(),
    function() {
        "use strict";
        var a = Element.prototype.insertBefore,
            b = Element.prototype.appendChild,
            c = Element.prototype.removeChild;
        Polymer.TreeApi = {
            arrayCopyChildNodes: function(a) {
                for (var b = [], c = 0, d = a.firstChild; d; d = d.nextSibling) b[c++] = d;
                return b
            },
            arrayCopyChildren: function(a) {
                for (var b = [], c = 0, d = a.firstElementChild; d; d = d.nextElementSibling) b[c++] = d;
                return b
            },
            arrayCopy: function(a) {
                for (var b = a.length, c = new Array(b), d = 0; b > d; d++) c[d] = a[d];
                return c
            }
        };
        Polymer.TreeApi.Logical = {
            hasParentNode: function(a) {
                return Boolean(a.__dom && a.__dom.parentNode)
            },
            hasChildNodes: function(a) {
                return Boolean(a.__dom && void 0 !== a.__dom.childNodes)
            },
            getChildNodes: function(a) {
                return this.hasChildNodes(a) ? this._getChildNodes(a) : a.childNodes
            },
            _getChildNodes: function(a) {
                if (!a.__dom.childNodes) {
                    a.__dom.childNodes = [];
                    for (var b = a.__dom.firstChild; b; b = b.__dom.nextSibling) a.__dom.childNodes.push(b)
                }
                return a.__dom.childNodes
            },
            getParentNode: function(a) {
                return a.__dom && void 0 !== a.__dom.parentNode ? a.__dom.parentNode : a.parentNode
            },
            getFirstChild: function(a) {
                return a.__dom && void 0 !== a.__dom.firstChild ? a.__dom.firstChild : a.firstChild
            },
            getLastChild: function(a) {
                return a.__dom && void 0 !== a.__dom.lastChild ? a.__dom.lastChild : a.lastChild
            },
            getNextSibling: function(a) {
                return a.__dom && void 0 !== a.__dom.nextSibling ? a.__dom.nextSibling : a.nextSibling
            },
            getPreviousSibling: function(a) {
                return a.__dom && void 0 !== a.__dom.previousSibling ? a.__dom.previousSibling : a.previousSibling
            },
            getFirstElementChild: function(a) {
                return a.__dom && void 0 !== a.__dom.firstChild ? this._getFirstElementChild(a) : a.firstElementChild
            },
            _getFirstElementChild: function(a) {
                for (var b = a.__dom.firstChild; b && b.nodeType !== Node.ELEMENT_NODE;) b = b.__dom.nextSibling;
                return b
            },
            getLastElementChild: function(a) {
                return a.__dom && void 0 !== a.__dom.lastChild ? this._getLastElementChild(a) : a.lastElementChild
            },
            _getLastElementChild: function(a) {
                for (var b = a.__dom.lastChild; b && b.nodeType !== Node.ELEMENT_NODE;) b = b.__dom.previousSibling;
                return b
            },
            getNextElementSibling: function(a) {
                return a.__dom && void 0 !== a.__dom.nextSibling ? this._getNextElementSibling(a) : a.nextElementSibling
            },
            _getNextElementSibling: function(a) {
                for (var b = a.__dom.nextSibling; b && b.nodeType !== Node.ELEMENT_NODE;) b = b.__dom.nextSibling;
                return b
            },
            getPreviousElementSibling: function(a) {
                return a.__dom && void 0 !== a.__dom.previousSibling ? this._getPreviousElementSibling(a) : a.previousElementSibling
            },
            _getPreviousElementSibling: function(a) {
                for (var b = a.__dom.previousSibling; b && b.nodeType !== Node.ELEMENT_NODE;) b = b.__dom.previousSibling;
                return b
            },
            saveChildNodes: function(a) {
                if (!this.hasChildNodes(a)) {
                    a.__dom = a.__dom || {}, a.__dom.firstChild = a.firstChild, a.__dom.lastChild = a.lastChild, a.__dom.childNodes = [];
                    for (var b = a.firstChild; b; b = b.nextSibling) b.__dom = b.__dom || {}, b.__dom.parentNode = a, a.__dom.childNodes.push(b), b.__dom.nextSibling = b.nextSibling, b.__dom.previousSibling = b.previousSibling
                }
            },
            recordInsertBefore: function(a, b, c) {
                if (b.__dom.childNodes = null, a.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
                    for (var d = a.firstChild; d; d = d.nextSibling) this._linkNode(d, b, c);
                else this._linkNode(a, b, c)
            },
            _linkNode: function(a, b, c) {
                a.__dom = a.__dom || {}, b.__dom = b.__dom || {}, c && (c.__dom = c.__dom || {}), a.__dom.previousSibling = c ? c.__dom.previousSibling : b.__dom.lastChild, a.__dom.previousSibling && (a.__dom.previousSibling.__dom.nextSibling = a), a.__dom.nextSibling = c, a.__dom.nextSibling && (a.__dom.nextSibling.__dom.previousSibling = a), a.__dom.parentNode = b, c ? c === b.__dom.firstChild && (b.__dom.firstChild = a) : (b.__dom.lastChild = a, b.__dom.firstChild || (b.__dom.firstChild = a)), b.__dom.childNodes = null
            },
            recordRemoveChild: function(a, b) {
                a.__dom = a.__dom || {}, b.__dom = b.__dom || {}, a === b.__dom.firstChild && (b.__dom.firstChild = a.__dom.nextSibling), a === b.__dom.lastChild && (b.__dom.lastChild = a.__dom.previousSibling);
                var c = a.__dom.previousSibling,
                    d = a.__dom.nextSibling;
                c && (c.__dom.nextSibling = d), d && (d.__dom.previousSibling = c), a.__dom.parentNode = a.__dom.previousSibling = a.__dom.nextSibling = void 0, b.__dom.childNodes = null
            }
        }, Polymer.TreeApi.Composed = {
            getChildNodes: function(a) {
                return Polymer.TreeApi.arrayCopyChildNodes(a)
            },
            getParentNode: function(a) {
                return a.parentNode
            },
            clearChildNodes: function(a) {
                a.textContent = ""
            },
            insertBefore: function(b, c, d) {
                return a.call(b, c, d || null)
            },
            appendChild: function(a, c) {
                return b.call(a, c)
            },
            removeChild: function(a, b) {
                return c.call(a, b)
            }
        }
    }(), Polymer.DomApi = function() {
        "use strict";
        var a = Polymer.Settings,
            b = Polymer.TreeApi,
            c = function(a) {
                this.node = d ? c.wrap(a) : a
            },
            d = a.hasShadow && !a.nativeShadow;
        c.wrap = window.wrap ? window.wrap : function(a) {
            return a
        }, c.prototype = {
            flush: function() {
                Polymer.dom.flush()
            },
            deepContains: function(a) {
                if (this.node.contains(a)) return !0;
                for (var b = a, c = a.ownerDocument; b && b !== c && b !== this.node;) b = Polymer.dom(b).parentNode || b.host;
                return b === this.node
            },
            queryDistributedElements: function(a) {
                for (var b, d = this.getEffectiveChildNodes(), e = [], f = 0, g = d.length; g > f && (b = d[f]); f++) b.nodeType === Node.ELEMENT_NODE && c.matchesSelector.call(b, a) && e.push(b);
                return e
            },
            getEffectiveChildNodes: function() {
                for (var a, b = [], c = this.childNodes, d = 0, g = c.length; g > d && (a = c[d]); d++)
                    if (a.localName === e)
                        for (var h = f(a).getDistributedNodes(), i = 0; i < h.length; i++) b.push(h[i]);
                    else b.push(a);
                return b
            },
            observeNodes: function(a) {
                return a ? (this.observer || (this.observer = this.node.localName === e ? new c.DistributedNodesObserver(this) : new c.EffectiveNodesObserver(this)), this.observer.addListener(a)) : void 0
            },
            unobserveNodes: function(a) {
                this.observer && this.observer.removeListener(a)
            },
            notifyObserver: function() {
                this.observer && this.observer.notify()
            },
            _query: function(a, c, d) {
                c = c || this.node;
                var e = [];
                return this._queryElements(b.Logical.getChildNodes(c), a, d, e), e
            },
            _queryElements: function(a, b, c, d) {
                for (var e, f = 0, g = a.length; g > f && (e = a[f]); f++)
                    if (e.nodeType === Node.ELEMENT_NODE && this._queryElement(e, b, c, d)) return !0
            },
            _queryElement: function(a, c, d, e) {
                var f = c(a);
                return f && e.push(a), d && d(f) ? f : void this._queryElements(b.Logical.getChildNodes(a), c, d, e)
            }
        };
        var e = c.CONTENT = "content",
            f = c.factory = function(a) {
                return a = a || document, a.__domApi || (a.__domApi = new c.ctor(a)), a.__domApi
            };
        c.hasApi = function(a) {
            return Boolean(a.__domApi)
        }, c.ctor = c, Polymer.dom = function(a, b) {
            return a instanceof Event ? Polymer.EventApi.factory(a) : c.factory(a, b)
        };
        var g = Element.prototype;
        return c.matchesSelector = g.matches || g.matchesSelector || g.mozMatchesSelector || g.msMatchesSelector || g.oMatchesSelector || g.webkitMatchesSelector, c
    }(),
    function() {
        "use strict";
        var a = Polymer.Settings,
            b = Polymer.DomApi,
            c = b.factory,
            d = Polymer.TreeApi,
            e = Polymer.domInnerHTML.getInnerHTML,
            f = b.CONTENT;
        if (!a.useShadow) {
            var g = Element.prototype.cloneNode,
                h = Document.prototype.importNode;
            Polymer.Base.extend(b.prototype, {
                _lazyDistribute: function(a) {
                    a.shadyRoot && a.shadyRoot._distributionClean && (a.shadyRoot._distributionClean = !1, Polymer.dom.addDebouncer(a.debounce("_distribute", a._distributeContent)))
                },
                appendChild: function(a) {
                    return this.insertBefore(a)
                },
                insertBefore: function(a, e) {
                    if (e && d.Logical.getParentNode(e) !== this.node) throw Error("The ref_node to be inserted before is not a child of this node");
                    if (a.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                        var g = d.Logical.getParentNode(a);
                        g ? (b.hasApi(g) && c(g).notifyObserver(), this._removeNode(a)) : this._removeOwnerShadyRoot(a)
                    }
                    if (!this._addNode(a, e)) {
                        e && (e = e.localName === f ? this._firstComposedNode(e) : e);
                        var h = this.node._isShadyRoot ? this.node.host : this.node;
                        e ? d.Composed.insertBefore(h, a, e) : d.Composed.appendChild(h, a)
                    }
                    return this.notifyObserver(), a
                },
                _addNode: function(a, b) {
                    var c = this.getOwnerRoot();
                    if (c) {
                        var e = this._maybeAddInsertionPoint(a, this.node);
                        c._invalidInsertionPoints || (c._invalidInsertionPoints = e), this._addNodeToHost(c.host, a)
                    }
                    d.Logical.hasChildNodes(this.node) && d.Logical.recordInsertBefore(a, this.node, b);
                    var f = this._maybeDistribute(a) || this.node.shadyRoot;
                    if (f)
                        if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
                            for (; a.firstChild;) d.Composed.removeChild(a, a.firstChild);
                        else {
                            var g = d.Composed.getParentNode(a);
                            g && d.Composed.removeChild(g, a)
                        }
                    return f
                },
                removeChild: function(a) {
                    if (d.Logical.getParentNode(a) !== this.node) throw Error("The node to be removed is not a child of this node: " + a);
                    if (!this._removeNode(a)) {
                        var b = this.node._isShadyRoot ? this.node.host : this.node,
                            c = d.Composed.getParentNode(a);
                        b === c && d.Composed.removeChild(b, a)
                    }
                    return this.notifyObserver(), a
                },
                _removeNode: function(a) {
                    var b, e = d.Logical.hasParentNode(a) && d.Logical.getParentNode(a),
                        f = this._ownerShadyRootForNode(a);
                    return e && (b = c(a)._maybeDistributeParent(), d.Logical.recordRemoveChild(a, e), f && this._removeDistributedChildren(f, a) && (f._invalidInsertionPoints = !0, this._lazyDistribute(f.host))), this._removeOwnerShadyRoot(a), f && this._removeNodeFromHost(f.host, a), b
                },
                replaceChild: function(a, b) {
                    return this.insertBefore(a, b), this.removeChild(b), a
                },
                _hasCachedOwnerRoot: function(a) {
                    return Boolean(void 0 !== a._ownerShadyRoot)
                },
                getOwnerRoot: function() {
                    return this._ownerShadyRootForNode(this.node)
                },
                _ownerShadyRootForNode: function(a) {
                    if (a) {
                        var b = a._ownerShadyRoot;
                        if (void 0 === b) {
                            if (a._isShadyRoot) b = a;
                            else {
                                var c = d.Logical.getParentNode(a);
                                b = c ? c._isShadyRoot ? c : this._ownerShadyRootForNode(c) : null
                            }(b || document.documentElement.contains(a)) && (a._ownerShadyRoot = b)
                        }
                        return b
                    }
                },
                _maybeDistribute: function(a) {
                    var b = a.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !a.__noContent && c(a).querySelector(f),
                        e = b && d.Logical.getParentNode(b).nodeType !== Node.DOCUMENT_FRAGMENT_NODE,
                        g = b || a.localName === f;
                    if (g) {
                        var h = this.getOwnerRoot();
                        h && this._lazyDistribute(h.host)
                    }
                    var i = this._nodeNeedsDistribution(this.node);
                    return i && this._lazyDistribute(this.node), i || g && !e
                },
                _maybeAddInsertionPoint: function(a, b) {
                    var e;
                    if (a.nodeType !== Node.DOCUMENT_FRAGMENT_NODE || a.__noContent) a.localName === f && (d.Logical.saveChildNodes(b), d.Logical.saveChildNodes(a), e = !0);
                    else
                        for (var g, h, i, j = c(a).querySelectorAll(f), k = 0; k < j.length && (g = j[k]); k++) h = d.Logical.getParentNode(g), h === a && (h = b), i = this._maybeAddInsertionPoint(g, h), e = e || i;
                    return e
                },
                _updateInsertionPoints: function(a) {
                    for (var b, e = a.shadyRoot._insertionPoints = c(a.shadyRoot).querySelectorAll(f), g = 0; g < e.length; g++) b = e[g], d.Logical.saveChildNodes(b), d.Logical.saveChildNodes(d.Logical.getParentNode(b))
                },
                _nodeNeedsDistribution: function(a) {
                    return a && a.shadyRoot && b.hasInsertionPoint(a.shadyRoot)
                },
                _addNodeToHost: function(a, b) {
                    a._elementAdd && a._elementAdd(b)
                },
                _removeNodeFromHost: function(a, b) {
                    a._elementRemove && a._elementRemove(b)
                },
                _removeDistributedChildren: function(a, b) {
                    for (var e, f = a._insertionPoints, g = 0; g < f.length; g++) {
                        var h = f[g];
                        if (this._contains(b, h))
                            for (var i = c(h).getDistributedNodes(), j = 0; j < i.length; j++) {
                                e = !0;
                                var k = i[j],
                                    l = d.Composed.getParentNode(k);
                                l && d.Composed.removeChild(l, k)
                            }
                    }
                    return e
                },
                _contains: function(a, b) {
                    for (; b;) {
                        if (b == a) return !0;
                        b = d.Logical.getParentNode(b)
                    }
                },
                _removeOwnerShadyRoot: function(a) {
                    if (this._hasCachedOwnerRoot(a))
                        for (var b, c = d.Logical.getChildNodes(a), e = 0, f = c.length; f > e && (b = c[e]); e++) this._removeOwnerShadyRoot(b);
                    a._ownerShadyRoot = void 0
                },
                _firstComposedNode: function(a) {
                    for (var b, d, e = c(a).getDistributedNodes(), f = 0, g = e.length; g > f && (b = e[f]); f++)
                        if (d = c(b).getDestinationInsertionPoints(), d[d.length - 1] === a) return b
                },
                querySelector: function(a) {
                    var c = this._query(function(c) {
                        return b.matchesSelector.call(c, a)
                    }, this.node, function(a) {
                        return Boolean(a)
                    })[0];
                    return c || null
                },
                querySelectorAll: function(a) {
                    return this._query(function(c) {
                        return b.matchesSelector.call(c, a)
                    }, this.node)
                },
                getDestinationInsertionPoints: function() {
                    return this.node._destinationInsertionPoints || []
                },
                getDistributedNodes: function() {
                    return this.node._distributedNodes || []
                },
                _clear: function() {
                    for (; this.childNodes.length;) this.removeChild(this.childNodes[0])
                },
                setAttribute: function(a, b) {
                    this.node.setAttribute(a, b), this._maybeDistributeParent()
                },
                removeAttribute: function(a) {
                    this.node.removeAttribute(a), this._maybeDistributeParent()
                },
                _maybeDistributeParent: function() {
                    return this._nodeNeedsDistribution(this.parentNode) ? (this._lazyDistribute(this.parentNode), !0) : void 0
                },
                cloneNode: function(a) {
                    var b = g.call(this.node, !1);
                    if (a)
                        for (var d, e = this.childNodes, f = c(b), h = 0; h < e.length; h++) d = c(e[h]).cloneNode(!0), f.appendChild(d);
                    return b
                },
                importNode: function(a, b) {
                    var e = this.node instanceof Document ? this.node : this.node.ownerDocument,
                        f = h.call(e, a, !1);
                    if (b)
                        for (var g, i = d.Logical.getChildNodes(a), j = c(f), k = 0; k < i.length; k++) g = c(e).importNode(i[k], !0), j.appendChild(g);
                    return f
                },
                _getComposedInnerHTML: function() {
                    return e(this.node, !0)
                }
            }), Object.defineProperties(b.prototype, {
                activeElement: {
                    get: function() {
                        var a = document.activeElement;
                        if (!a) return null;
                        var b = !!this.node._isShadyRoot;
                        if (this.node !== document) {
                            if (!b) return null;
                            if (this.node.host === a || !this.node.host.contains(a)) return null
                        }
                        for (var d = c(a).getOwnerRoot(); d && d !== this.node;) a = d.host, d = c(a).getOwnerRoot();
                        return this.node === document ? d ? null : a : d === this.node ? a : null
                    },
                    configurable: !0
                },
                childNodes: {
                    get: function() {
                        var a = d.Logical.getChildNodes(this.node);
                        return Array.isArray(a) ? a : d.arrayCopyChildNodes(this.node)
                    },
                    configurable: !0
                },
                children: {
                    get: function() {
                        return d.Logical.hasChildNodes(this.node) ? Array.prototype.filter.call(this.childNodes, function(a) {
                            return a.nodeType === Node.ELEMENT_NODE
                        }) : d.arrayCopyChildren(this.node)
                    },
                    configurable: !0
                },
                parentNode: {
                    get: function() {
                        return d.Logical.getParentNode(this.node)
                    },
                    configurable: !0
                },
                firstChild: {
                    get: function() {
                        return d.Logical.getFirstChild(this.node)
                    },
                    configurable: !0
                },
                lastChild: {
                    get: function() {
                        return d.Logical.getLastChild(this.node)
                    },
                    configurable: !0
                },
                nextSibling: {
                    get: function() {
                        return d.Logical.getNextSibling(this.node)
                    },
                    configurable: !0
                },
                previousSibling: {
                    get: function() {
                        return d.Logical.getPreviousSibling(this.node)
                    },
                    configurable: !0
                },
                firstElementChild: {
                    get: function() {
                        return d.Logical.getFirstElementChild(this.node)
                    },
                    configurable: !0
                },
                lastElementChild: {
                    get: function() {
                        return d.Logical.getLastElementChild(this.node)
                    },
                    configurable: !0
                },
                nextElementSibling: {
                    get: function() {
                        return d.Logical.getNextElementSibling(this.node)
                    },
                    configurable: !0
                },
                previousElementSibling: {
                    get: function() {
                        return d.Logical.getPreviousElementSibling(this.node)
                    },
                    configurable: !0
                },
                textContent: {
                    get: function() {
                        var a = this.node.nodeType;
                        if (a === Node.TEXT_NODE || a === Node.COMMENT_NODE) return this.node.textContent;
                        for (var b, c = [], d = 0, e = this.childNodes; b = e[d]; d++) b.nodeType !== Node.COMMENT_NODE && c.push(b.textContent);
                        return c.join("")
                    },
                    set: function(a) {
                        var b = this.node.nodeType;
                        b === Node.TEXT_NODE || b === Node.COMMENT_NODE ? this.node.textContent = a : (this._clear(), a && this.appendChild(document.createTextNode(a)))
                    },
                    configurable: !0
                },
                innerHTML: {
                    get: function() {
                        var a = this.node.nodeType;
                        return a === Node.TEXT_NODE || a === Node.COMMENT_NODE ? null : e(this.node)
                    },
                    set: function(a) {
                        var b = this.node.nodeType;
                        if (b !== Node.TEXT_NODE || b !== Node.COMMENT_NODE) {
                            this._clear();
                            var c = document.createElement("div");
                            c.innerHTML = a;
                            for (var e = d.arrayCopyChildNodes(c), f = 0; f < e.length; f++) this.appendChild(e[f])
                        }
                    },
                    configurable: !0
                }
            }), b.hasInsertionPoint = function(a) {
                return Boolean(a && a._insertionPoints.length)
            }
        }
    }(),
    function() {
        "use strict";
        var a = Polymer.Settings,
            b = Polymer.TreeApi,
            c = Polymer.DomApi;
        if (a.useShadow) {
            Polymer.Base.extend(c.prototype, {
                querySelectorAll: function(a) {
                    return b.arrayCopy(this.node.querySelectorAll(a))
                },
                getOwnerRoot: function() {
                    for (var a = this.node; a;) {
                        if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE && a.host) return a;
                        a = a.parentNode
                    }
                },
                importNode: function(a, b) {
                    var c = this.node instanceof Document ? this.node : this.node.ownerDocument;
                    return c.importNode(a, b)
                },
                getDestinationInsertionPoints: function() {
                    var a = this.node.getDestinationInsertionPoints && this.node.getDestinationInsertionPoints();
                    return a ? b.arrayCopy(a) : []
                },
                getDistributedNodes: function() {
                    var a = this.node.getDistributedNodes && this.node.getDistributedNodes();
                    return a ? b.arrayCopy(a) : []
                }
            }), Object.defineProperties(c.prototype, {
                activeElement: {
                    get: function() {
                        var a = c.wrap(this.node),
                            b = a.activeElement;
                        return a.contains(b) ? b : null
                    },
                    configurable: !0
                },
                childNodes: {
                    get: function() {
                        return b.arrayCopyChildNodes(this.node)
                    },
                    configurable: !0
                },
                children: {
                    get: function() {
                        return b.arrayCopyChildren(this.node)
                    },
                    configurable: !0
                },
                textContent: {
                    get: function() {
                        return this.node.textContent
                    },
                    set: function(a) {
                        return this.node.textContent = a
                    },
                    configurable: !0
                },
                innerHTML: {
                    get: function() {
                        return this.node.innerHTML
                    },
                    set: function(a) {
                        return this.node.innerHTML = a
                    },
                    configurable: !0
                }
            });
            var d = function(a) {
                    for (var b = 0; b < a.length; b++) e(a[b])
                },
                e = function(a) {
                    c.prototype[a] = function() {
                        return this.node[a].apply(this.node, arguments)
                    }
                };
            d(["cloneNode", "appendChild", "insertBefore", "removeChild", "replaceChild", "setAttribute", "removeAttribute", "querySelector"]);
            var f = function(a) {
                    for (var b = 0; b < a.length; b++) g(a[b])
                },
                g = function(a) {
                    Object.defineProperty(c.prototype, a, {
                        get: function() {
                            return this.node[a]
                        },
                        configurable: !0
                    })
                };
            f(["parentNode", "firstChild", "lastChild", "nextSibling", "previousSibling", "firstElementChild", "lastElementChild", "nextElementSibling", "previousElementSibling"])
        }
    }(), Polymer.Base.extend(Polymer.dom, {
        _flushGuard: 0,
        _FLUSH_MAX: 100,
        _needsTakeRecords: !Polymer.Settings.useNativeCustomElements,
        _debouncers: [],
        _staticFlushList: [],
        _finishDebouncer: null,
        flush: function() {
            for (this._flushGuard = 0, this._prepareFlush(); this._debouncers.length && this._flushGuard < this._FLUSH_MAX;) {
                for (; this._debouncers.length;) this._debouncers.shift().complete();
                this._finishDebouncer && this._finishDebouncer.complete(), this._prepareFlush(), this._flushGuard++
            }
            this._flushGuard >= this._FLUSH_MAX && console.warn("Polymer.dom.flush aborted. Flush may not be complete.")
        },
        _prepareFlush: function() {
            this._needsTakeRecords && CustomElements.takeRecords();
            for (var a = 0; a < this._staticFlushList.length; a++) this._staticFlushList[a]()
        },
        addStaticFlush: function(a) {
            this._staticFlushList.push(a)
        },
        removeStaticFlush: function(a) {
            var b = this._staticFlushList.indexOf(a);
            b >= 0 && this._staticFlushList.splice(b, 1)
        },
        addDebouncer: function(a) {
            this._debouncers.push(a), this._finishDebouncer = Polymer.Debounce(this._finishDebouncer, this._finishFlush)
        },
        _finishFlush: function() {
            Polymer.dom._debouncers = []
        }
    }), Polymer.EventApi = function() {
        "use strict";
        var a = Polymer.DomApi.ctor,
            b = Polymer.Settings;
        a.Event = function(a) {
            this.event = a
        }, b.useShadow ? a.Event.prototype = {
            get rootTarget() {
                return this.event.path[0]
            },
            get localTarget() {
                return this.event.target
            },
            get path() {
                return this.event.path
            }
        } : a.Event.prototype = {
            get rootTarget() {
                return this.event.target
            },
            get localTarget() {
                for (var a = this.event.currentTarget, b = a && Polymer.dom(a).getOwnerRoot(), c = this.path, d = 0; d < c.length; d++)
                    if (Polymer.dom(c[d]).getOwnerRoot() === b) return c[d]
            },
            get path() {
                if (!this.event._path) {
                    for (var a = [], b = this.rootTarget; b;) {
                        a.push(b);
                        var c = Polymer.dom(b).getDestinationInsertionPoints();
                        if (c.length) {
                            for (var d = 0; d < c.length - 1; d++) a.push(c[d]);
                            b = c[c.length - 1]
                        } else b = Polymer.dom(b).parentNode || b.host
                    }
                    a.push(window), this.event._path = a
                }
                return this.event._path
            }
        };
        var c = function(b) {
            return b.__eventApi || (b.__eventApi = new a.Event(b)), b.__eventApi
        };
        return {
            factory: c
        }
    }(),
    function() {
        "use strict";
        var a = Polymer.DomApi.ctor,
            b = Polymer.Settings.useShadow;
        Object.defineProperty(a.prototype, "classList", {
            get: function() {
                return this._classList || (this._classList = new a.ClassList(this)), this._classList
            },
            configurable: !0
        }), a.ClassList = function(a) {
            this.domApi = a, this.node = a.node
        }, a.ClassList.prototype = {
            add: function() {
                this.node.classList.add.apply(this.node.classList, arguments), this._distributeParent()
            },
            remove: function() {
                this.node.classList.remove.apply(this.node.classList, arguments), this._distributeParent()
            },
            toggle: function() {
                this.node.classList.toggle.apply(this.node.classList, arguments), this._distributeParent()
            },
            _distributeParent: function() {
                b || this.domApi._maybeDistributeParent()
            },
            contains: function() {
                return this.node.classList.contains.apply(this.node.classList, arguments)
            }
        }
    }(),
    function() {
        "use strict";
        var a = Polymer.DomApi.ctor,
            b = Polymer.Settings;
        Polymer.DomApi.hasDomApi;
        if (a.EffectiveNodesObserver = function(a) {
                this.domApi = a, this.node = this.domApi.node, this._listeners = []
            }, a.EffectiveNodesObserver.prototype = {
                addListener: function(a) {
                    this._isSetup || (this._setup(), this._isSetup = !0);
                    var b = {
                        fn: a,
                        _nodes: []
                    };
                    return this._listeners.push(b), this._scheduleNotify(), b
                },
                removeListener: function(a) {
                    var b = this._listeners.indexOf(a);
                    b >= 0 && (this._listeners.splice(b, 1), a._nodes = []), this._hasListeners() || (this._cleanup(), this._isSetup = !1)
                },
                _setup: function() {
                    this._observeContentElements(this.domApi.childNodes)
                },
                _cleanup: function() {
                    this._unobserveContentElements(this.domApi.childNodes)
                },
                _hasListeners: function() {
                    return Boolean(this._listeners.length)
                },
                _scheduleNotify: function() {
                    this._debouncer && this._debouncer.stop(), this._debouncer = Polymer.Debounce(this._debouncer, this._notify), this._debouncer.context = this, Polymer.dom.addDebouncer(this._debouncer)
                },
                notify: function() {
                    this._hasListeners() && this._scheduleNotify()
                },
                _notify: function(a) {
                    this._beforeCallListeners(), this._callListeners()
                },
                _beforeCallListeners: function() {
                    this._updateContentElements()
                },
                _updateContentElements: function() {
                    this._observeContentElements(this.domApi.childNodes)
                },
                _observeContentElements: function(a) {
                    for (var b, c = 0; c < a.length && (b = a[c]); c++) this._isContent(b) && (b.__observeNodesMap = b.__observeNodesMap || new WeakMap, b.__observeNodesMap.has(this) || b.__observeNodesMap.set(this, this._observeContent(b)))
                },
                _observeContent: function(a) {
                    var b = this,
                        c = Polymer.dom(a).observeNodes(function() {
                            b._scheduleNotify()
                        });
                    return c._avoidChangeCalculation = !0, c
                },
                _unobserveContentElements: function(a) {
                    for (var b, c, d = 0; d < a.length && (b = a[d]); d++) this._isContent(b) && (c = b.__observeNodesMap.get(this), c && (Polymer.dom(b).unobserveNodes(c), b.__observeNodesMap["delete"](this)))
                },
                _isContent: function(a) {
                    return "content" === a.localName
                },
                _callListeners: function() {
                    for (var a, b = this._listeners, c = this._getEffectiveNodes(), d = 0; d < b.length && (a = b[d]); d++) {
                        var e = this._generateListenerInfo(a, c);
                        (e || a._alwaysNotify) && this._callListener(a, e)
                    }
                },
                _getEffectiveNodes: function() {
                    return this.domApi.getEffectiveChildNodes()
                },
                _generateListenerInfo: function(a, b) {
                    if (a._avoidChangeCalculation) return !0;
                    for (var c, d = a._nodes, e = {
                            target: this.node,
                            addedNodes: [],
                            removedNodes: []
                        }, f = Polymer.ArraySplice.calculateSplices(b, d), g = 0; g < f.length && (c = f[g]); g++)
                        for (var h, i = 0; i < c.removed.length && (h = c.removed[i]); i++) e.removedNodes.push(h);
                    for (var c, g = 0; g < f.length && (c = f[g]); g++)
                        for (var i = c.index; i < c.index + c.addedCount; i++) e.addedNodes.push(b[i]);
                    return a._nodes = b, e.addedNodes.length || e.removedNodes.length ? e : void 0
                },
                _callListener: function(a, b) {
                    return a.fn.call(this.node, b)
                },
                enableShadowAttributeTracking: function() {}
            }, b.useShadow) {
            var c = a.EffectiveNodesObserver.prototype._setup,
                d = a.EffectiveNodesObserver.prototype._cleanup;
            a.EffectiveNodesObserver.prototype._beforeCallListeners;
            Polymer.Base.extend(a.EffectiveNodesObserver.prototype, {
                _setup: function() {
                    if (!this._observer) {
                        var a = this;
                        this._mutationHandler = function(b) {
                            b && b.length && a._scheduleNotify()
                        }, this._observer = new MutationObserver(this._mutationHandler), this._boundFlush = function() {
                            a._flush()
                        }, Polymer.dom.addStaticFlush(this._boundFlush), this._observer.observe(this.node, {
                            childList: !0
                        })
                    }
                    c.call(this)
                },
                _cleanup: function() {
                    this._observer.disconnect(), this._observer = null, this._mutationHandler = null, Polymer.dom.removeStaticFlush(this._boundFlush), d.call(this)
                },
                _flush: function() {
                    this._observer && this._mutationHandler(this._observer.takeRecords())
                },
                enableShadowAttributeTracking: function() {
                    if (this._observer) {
                        this._makeContentListenersAlwaysNotify(), this._observer.disconnect(), this._observer.observe(this.node, {
                            childList: !0,
                            attributes: !0,
                            subtree: !0
                        });
                        var a = this.domApi.getOwnerRoot(),
                            b = a && a.host;
                        b && Polymer.dom(b).observer && Polymer.dom(b).observer.enableShadowAttributeTracking()
                    }
                },
                _makeContentListenersAlwaysNotify: function() {
                    for (var a, b = 0; b < this._listeners.length; b++) a = this._listeners[b], a._alwaysNotify = a._isContentListener
                }
            })
        }
    }(),
    function() {
        "use strict";
        var a = Polymer.DomApi.ctor,
            b = Polymer.Settings;
        a.DistributedNodesObserver = function(b) {
            a.EffectiveNodesObserver.call(this, b)
        }, a.DistributedNodesObserver.prototype = Object.create(a.EffectiveNodesObserver.prototype), Polymer.Base.extend(a.DistributedNodesObserver.prototype, {
            _setup: function() {},
            _cleanup: function() {},
            _beforeCallListeners: function() {},
            _getEffectiveNodes: function() {
                return this.domApi.getDistributedNodes()
            }
        }), b.useShadow && Polymer.Base.extend(a.DistributedNodesObserver.prototype, {
            _setup: function() {
                if (!this._observer) {
                    var a = this.domApi.getOwnerRoot(),
                        b = a && a.host;
                    if (b) {
                        var c = this;
                        this._observer = Polymer.dom(b).observeNodes(function() {
                            c._scheduleNotify()
                        }), this._observer._isContentListener = !0, this._hasAttrSelect() && Polymer.dom(b).observer.enableShadowAttributeTracking()
                    }
                }
            },
            _hasAttrSelect: function() {
                var a = this.node.getAttribute("select");
                return a && a.match(/[[.]+/)
            },
            _cleanup: function() {
                var a = this.domApi.getOwnerRoot(),
                    b = a && a.host;
                b && Polymer.dom(b).unobserveNodes(this._observer), this._observer = null
            }
        })
    }(),
    function() {
        function a(a, b) {
            b._distributedNodes.push(a);
            var c = a._destinationInsertionPoints;
            c ? c.push(b) : a._destinationInsertionPoints = [b]
        }

        function b(a) {
            var b = a._distributedNodes;
            if (b)
                for (var c = 0; c < b.length; c++) {
                    var d = b[c]._destinationInsertionPoints;
                    d && d.splice(d.indexOf(a) + 1, d.length)
                }
        }

        function c(a, b) {
            var c = l.Logical.getParentNode(a);
            c && c.shadyRoot && k.hasInsertionPoint(c.shadyRoot) && c.shadyRoot._distributionClean && (c.shadyRoot._distributionClean = !1, b.shadyRoot._dirtyRoots.push(c))
        }

        function d(a, b) {
            var c = b._destinationInsertionPoints;
            return c && c[c.length - 1] === a
        }

        function e(a) {
            return "content" == a.localName
        }

        function f(a) {
            for (; a && g(a);) a = a.domHost;
            return a
        }

        function g(a) {
            for (var b, c = l.Logical.getChildNodes(a), d = 0; d < c.length; d++)
                if (b = c[d], b.localName && "content" === b.localName) return a.domHost
        }

        function h(a) {
            for (var b, c = 0; c < a._insertionPoints.length; c++) b = a._insertionPoints[c], k.hasApi(b) && Polymer.dom(b).notifyObserver()
        }

        function i(a) {
            k.hasApi(a) && Polymer.dom(a).notifyObserver()
        }

        function j(a) {
            if (m && a)
                for (var b = 0; b < a.length; b++) CustomElements.upgrade(a[b])
        }
        var k = Polymer.DomApi,
            l = Polymer.TreeApi;
        Polymer.Base._addFeature({
            _prepShady: function() {
                this._useContent = this._useContent || Boolean(this._template)
            },
            _setupShady: function() {
                this.shadyRoot = null, this.__domApi || (this.__domApi = null), this.__dom || (this.__dom = null), this._ownerShadyRoot || (this._ownerShadyRoot = void 0)
            },
            _poolContent: function() {
                this._useContent && l.Logical.saveChildNodes(this)
            },
            _setupRoot: function() {
                this._useContent && (this._createLocalRoot(), this.dataHost || j(l.Logical.getChildNodes(this)))
            },
            _createLocalRoot: function() {
                this.shadyRoot = this.root, this.shadyRoot._distributionClean = !1, this.shadyRoot._hasDistributed = !1, this.shadyRoot._isShadyRoot = !0, this.shadyRoot._dirtyRoots = [];
                var a = this.shadyRoot._insertionPoints = !this._notes || this._notes._hasContent ? this.shadyRoot.querySelectorAll("content") : [];
                l.Logical.saveChildNodes(this.shadyRoot);
                for (var b, c = 0; c < a.length; c++) b = a[c], l.Logical.saveChildNodes(b), l.Logical.saveChildNodes(b.parentNode);
                this.shadyRoot.host = this
            },
            get domHost() {
                var a = Polymer.dom(this).getOwnerRoot();
                return a && a.host
            },
            distributeContent: function(a) {
                if (this.shadyRoot) {
                    this.shadyRoot._invalidInsertionPoints = this.shadyRoot._invalidInsertionPoints || a;
                    var b = f(this);
                    Polymer.dom(this)._lazyDistribute(b)
                }
            },
            _distributeContent: function() {
                this._useContent && !this.shadyRoot._distributionClean && (this.shadyRoot._invalidInsertionPoints && (Polymer.dom(this)._updateInsertionPoints(this), this.shadyRoot._invalidInsertionPoints = !1), this._beginDistribute(), this._distributeDirtyRoots(), this._finishDistribute())
            },
            _beginDistribute: function() {
                this._useContent && k.hasInsertionPoint(this.shadyRoot) && (this._resetDistribution(), this._distributePool(this.shadyRoot, this._collectPool()))
            },
            _distributeDirtyRoots: function() {
                for (var a, b = this.shadyRoot._dirtyRoots, c = 0, d = b.length; d > c && (a = b[c]); c++) a._distributeContent();
                this.shadyRoot._dirtyRoots = []
            },
            _finishDistribute: function() {
                if (this._useContent) {
                    if (this.shadyRoot._distributionClean = !0, k.hasInsertionPoint(this.shadyRoot)) this._composeTree(), h(this.shadyRoot);
                    else if (this.shadyRoot._hasDistributed) {
                        var a = this._composeNode(this);
                        this._updateChildNodes(this, a)
                    } else l.Composed.clearChildNodes(this), this.appendChild(this.shadyRoot);
                    this.shadyRoot._hasDistributed || i(this), this.shadyRoot._hasDistributed = !0
                }
            },
            elementMatches: function(a, b) {
                return b = b || this, k.matchesSelector.call(b, a)
            },
            _resetDistribution: function() {
                for (var a = l.Logical.getChildNodes(this), c = 0; c < a.length; c++) {
                    var d = a[c];
                    d._destinationInsertionPoints && (d._destinationInsertionPoints = void 0), e(d) && b(d)
                }
                for (var f = this.shadyRoot, g = f._insertionPoints, h = 0; h < g.length; h++) g[h]._distributedNodes = []
            },
            _collectPool: function() {
                for (var a = [], b = l.Logical.getChildNodes(this), c = 0; c < b.length; c++) {
                    var d = b[c];
                    e(d) ? a.push.apply(a, d._distributedNodes) : a.push(d)
                }
                return a
            },
            _distributePool: function(a, b) {
                for (var d, e = a._insertionPoints, f = 0, g = e.length; g > f && (d = e[f]); f++) this._distributeInsertionPoint(d, b), c(d, this)
            },
            _distributeInsertionPoint: function(b, c) {
                for (var d, e = !1, f = 0, g = c.length; g > f; f++) d = c[f], d && this._matchesContentSelect(d, b) && (a(d, b), c[f] = void 0, e = !0);
                if (!e)
                    for (var h = l.Logical.getChildNodes(b), i = 0; i < h.length; i++) a(h[i], b)
            },
            _composeTree: function() {
                this._updateChildNodes(this, this._composeNode(this));
                for (var a, b, c = this.shadyRoot._insertionPoints, d = 0, e = c.length; e > d && (a = c[d]); d++) b = l.Logical.getParentNode(a), b._useContent || b === this || b === this.shadyRoot || this._updateChildNodes(b, this._composeNode(b))
            },
            _composeNode: function(a) {
                for (var b = [], c = l.Logical.getChildNodes(a.shadyRoot || a), f = 0; f < c.length; f++) {
                    var g = c[f];
                    if (e(g))
                        for (var h = g._distributedNodes, i = 0; i < h.length; i++) {
                            var j = h[i];
                            d(g, j) && b.push(j)
                        } else b.push(g)
                }
                return b
            },
            _updateChildNodes: function(a, b) {
                for (var c, d = l.Composed.getChildNodes(a), e = Polymer.ArraySplice.calculateSplices(b, d), f = 0, g = 0; f < e.length && (c = e[f]); f++) {
                    for (var h, i = 0; i < c.removed.length && (h = c.removed[i]); i++) l.Composed.getParentNode(h) === a && l.Composed.removeChild(a, h), d.splice(c.index + g, 1);
                    g -= c.addedCount
                }
                for (var c, j, f = 0; f < e.length && (c = e[f]); f++) {
                    j = d[c.index];
                    for (var h, i = c.index; i < c.index + c.addedCount; i++) h = b[i], l.Composed.insertBefore(a, h, j), d.splice(i, 0, h)
                }
            },
            _matchesContentSelect: function(a, b) {
                var c = b.getAttribute("select");
                if (!c) return !0;
                if (c = c.trim(), !c) return !0;
                if (!(a instanceof Element)) return !1;
                var d = /^(:not\()?[*.#[a-zA-Z_|]/;
                return d.test(c) ? this.elementMatches(c, a) : !1
            },
            _elementAdd: function() {},
            _elementRemove: function() {}
        });
        var m = window.CustomElements && !CustomElements.useNative
    }(), Polymer.Settings.useShadow && Polymer.Base._addFeature({
        _poolContent: function() {},
        _beginDistribute: function() {},
        distributeContent: function() {},
        _distributeContent: function() {},
        _finishDistribute: function() {},
        _createLocalRoot: function() {
            this.createShadowRoot(), this.shadowRoot.appendChild(this.root), this.root = this.shadowRoot
        }
    }), Polymer.Async = {
        _currVal: 0,
        _lastVal: 0,
        _callbacks: [],
        _twiddleContent: 0,
        _twiddle: document.createTextNode(""),
        run: function(a, b) {
            return b > 0 ? ~setTimeout(a, b) : (this._twiddle.textContent = this._twiddleContent++, this._callbacks.push(a), this._currVal++)
        },
        cancel: function(a) {
            if (0 > a) clearTimeout(~a);
            else {
                var b = a - this._lastVal;
                if (b >= 0) {
                    if (!this._callbacks[b]) throw "invalid async handle: " + a;
                    this._callbacks[b] = null
                }
            }
        },
        _atEndOfMicrotask: function() {
            for (var a = this._callbacks.length, b = 0; a > b; b++) {
                var c = this._callbacks[b];
                if (c) try {
                    c()
                } catch (d) {
                    throw b++, this._callbacks.splice(0, b), this._lastVal += b, this._twiddle.textContent = this._twiddleContent++, d
                }
            }
            this._callbacks.splice(0, a), this._lastVal += a
        }
    }, new window.MutationObserver(function() {
        Polymer.Async._atEndOfMicrotask()
    }).observe(Polymer.Async._twiddle, {
        characterData: !0
    }), Polymer.Debounce = function() {
        function a(a, b, d) {
            return a ? a.stop() : a = new c(this), a.go(b, d), a
        }
        var b = Polymer.Async,
            c = function(a) {
                this.context = a;
                var b = this;
                this.boundComplete = function() {
                    b.complete()
                }
            };
        return c.prototype = {
            go: function(a, c) {
                var d;
                this.finish = function() {
                    b.cancel(d)
                }, d = b.run(this.boundComplete, c), this.callback = a
            },
            stop: function() {
                this.finish && (this.finish(), this.finish = null)
            },
            complete: function() {
                this.finish && (this.stop(), this.callback.call(this.context))
            }
        }, a
    }(), Polymer.Base._addFeature({
        _setupDebouncers: function() {
            this._debouncers = {}
        },
        debounce: function(a, b, c) {
            return this._debouncers[a] = Polymer.Debounce.call(this, this._debouncers[a], b, c)
        },
        isDebouncerActive: function(a) {
            var b = this._debouncers[a];
            return !(!b || !b.finish)
        },
        flushDebouncer: function(a) {
            var b = this._debouncers[a];
            b && b.complete()
        },
        cancelDebouncer: function(a) {
            var b = this._debouncers[a];
            b && b.stop()
        }
    }), Polymer.DomModule = document.createElement("dom-module"), Polymer.Base._addFeature({
        _registerFeatures: function() {
            this._prepIs(), this._prepBehaviors(), this._prepConstructor(), this._prepTemplate(), this._prepShady(), this._prepPropertyInfo()
        },
        _prepBehavior: function(a) {
            this._addHostAttributes(a.hostAttributes)
        },
        _initFeatures: function() {
            this._registerHost(), this._template && (this._poolContent(), this._beginHosting(), this._stampTemplate(), this._endHosting()), this._marshalHostAttributes(), this._setupDebouncers(), this._marshalBehaviors(), this._tryReady()
        },
        _marshalBehavior: function(a) {}
    }), Polymer.nar = [], Polymer.Annotations = {
        parseAnnotations: function(a) {
            var b = [],
                c = a._content || a.content;
            return this._parseNodeAnnotations(c, b, a.hasAttribute("strip-whitespace")), b
        },
        _parseNodeAnnotations: function(a, b, c) {
            return a.nodeType === Node.TEXT_NODE ? this._parseTextNodeAnnotation(a, b) : this._parseElementAnnotations(a, b, c)
        },
        _bindingRegex: function() {
            var a = "(?:[a-zA-Z_$][\\w.:$-*]*)",
                b = "(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)",
                c = "(?:'(?:[^'\\\\]|\\\\.)*')",
                d = '(?:"(?:[^"\\\\]|\\\\.)*")',
                e = "(?:" + c + "|" + d + ")",
                f = "(?:" + a + "|" + b + "|" + e + "\\s*)",
                g = "(?:" + f + "(?:,\\s*" + f + ")*)",
                h = "(?:\\(\\s*(?:" + g + "?)\\)\\s*)",
                i = "(" + a + "\\s*" + h + "?)",
                j = "(\\[\\[|{{)\\s*",
                k = "(?:]]|}})",
                l = "(?:(!)\\s*)?",
                m = j + l + i + k;
            return new RegExp(m, "g")
        }(),
        _parseBindings: function(a) {
            for (var b, c = this._bindingRegex, d = [], e = 0; null !== (b = c.exec(a));) {
                b.index > e && d.push({
                    literal: a.slice(e, b.index)
                });
                var f, g, h, i = b[1][0],
                    j = Boolean(b[2]),
                    k = b[3].trim();
                "{" == i && (h = k.indexOf("::")) > 0 && (g = k.substring(h + 2), k = k.substring(0, h), f = !0), d.push({
                    compoundIndex: d.length,
                    value: k,
                    mode: i,
                    negate: j,
                    event: g,
                    customEvent: f
                }), e = c.lastIndex
            }
            if (e && e < a.length) {
                var l = a.substring(e);
                l && d.push({
                    literal: l
                })
            }
            return d.length ? d : void 0
        },
        _literalFromParts: function(a) {
            for (var b = "", c = 0; c < a.length; c++) {
                var d = a[c].literal;
                b += d || ""
            }
            return b
        },
        _parseTextNodeAnnotation: function(a, b) {
            var c = this._parseBindings(a.textContent);
            if (c) {
                a.textContent = this._literalFromParts(c) || " ";
                var d = {
                    bindings: [{
                        kind: "text",
                        name: "textContent",
                        parts: c,
                        isCompound: 1 !== c.length
                    }]
                };
                return b.push(d), d
            }
        },
        _parseElementAnnotations: function(a, b, c) {
            var d = {
                bindings: [],
                events: []
            };
            return "content" === a.localName && (b._hasContent = !0), this._parseChildNodesAnnotations(a, d, b, c), a.attributes && (this._parseNodeAttributeAnnotations(a, d, b), this.prepElement && this.prepElement(a)), (d.bindings.length || d.events.length || d.id) && b.push(d), d
        },
        _parseChildNodesAnnotations: function(a, b, c, d) {
            if (a.firstChild)
                for (var e = a.firstChild, f = 0; e;) {
                    var g = e.nextSibling;
                    if ("template" !== e.localName || e.hasAttribute("preserve-content") || this._parseTemplate(e, f, c, b), e.nodeType === Node.TEXT_NODE) {
                        for (var h = g; h && h.nodeType === Node.TEXT_NODE;) e.textContent += h.textContent, g = h.nextSibling, a.removeChild(h), h = g;
                        d && !e.textContent.trim() && (a.removeChild(e), f--)
                    }
                    if (e.parentNode) {
                        var i = this._parseNodeAnnotations(e, c, d);
                        i && (i.parent = b, i.index = f)
                    }
                    e = g, f++
                }
        },
        _parseTemplate: function(a, b, c, d) {
            var e = document.createDocumentFragment();
            e._notes = this.parseAnnotations(a), e.appendChild(a.content), c.push({
                bindings: Polymer.nar,
                events: Polymer.nar,
                templateContent: e,
                parent: d,
                index: b
            })
        },
        _parseNodeAttributeAnnotations: function(a, b) {
            for (var c, d = Array.prototype.slice.call(a.attributes), e = d.length - 1; c = d[e]; e--) {
                var f, g = c.name,
                    h = c.value;
                "on-" === g.slice(0, 3) ? (a.removeAttribute(g), b.events.push({
                    name: g.slice(3),
                    value: h
                })) : (f = this._parseNodeAttributeAnnotation(a, g, h)) ? b.bindings.push(f) : "id" === g && (b.id = h)
            }
        },
        _parseNodeAttributeAnnotation: function(a, b, c) {
            var d = this._parseBindings(c);
            if (d) {
                var e = b,
                    f = "property";
                "$" == b[b.length - 1] && (b = b.slice(0, -1), f = "attribute");
                var g = this._literalFromParts(d);
                return g && "attribute" == f && a.setAttribute(b, g), "input" === a.localName && "value" === e && a.setAttribute(e, ""), a.removeAttribute(e), "property" === f && (b = Polymer.CaseMap.dashToCamelCase(b)), {
                    kind: f,
                    name: b,
                    parts: d,
                    literal: g,
                    isCompound: 1 !== d.length
                }
            }
        },
        findAnnotatedNode: function(a, b) {
            var c = b.parent && Polymer.Annotations.findAnnotatedNode(a, b.parent);
            if (!c) return a;
            for (var d = c.firstChild, e = 0; d; d = d.nextSibling)
                if (b.index === e++) return d
        }
    },
    function() {
        function a(a, b) {
            return a.replace(h, function(a, d, e, f) {
                return d + "'" + c(e.replace(/["']/g, ""), b) + "'" + f
            })
        }

        function b(b, d) {
            for (var e in i)
                for (var f, g, h, k = i[e], l = 0, m = k.length; m > l && (f = k[l]); l++) "*" !== e && b.localName !== e || (g = b.attributes[f], h = g && g.value, h && h.search(j) < 0 && (g.value = "style" === f ? a(h, d) : c(h, d)))
        }

        function c(a, b) {
            if (a && "#" === a[0]) return a;
            var c = e(b);
            return c.href = a, c.href || a
        }

        function d(a, b) {
            return f || (f = document.implementation.createHTMLDocument("temp"), g = f.createElement("base"), f.head.appendChild(g)), g.href = b, c(a, f)
        }

        function e(a) {
            return a.__urlResolver || (a.__urlResolver = a.createElement("a"))
        }
        var f, g, h = /(url\()([^)]*)(\))/g,
            i = {
                "*": ["href", "src", "style", "url"],
                form: ["action"]
            },
            j = /\{\{|\[\[/;
        Polymer.ResolveUrl = {
            resolveCss: a,
            resolveAttrs: b,
            resolveUrl: d
        }
    }(), Polymer.Base._addFeature({
        _prepAnnotations: function() {
            if (this._template) {
                var a = this;
                Polymer.Annotations.prepElement = function(b) {
                    a._prepElement(b)
                }, this._template._content && this._template._content._notes ? this._notes = this._template._content._notes : (this._notes = Polymer.Annotations.parseAnnotations(this._template), this._processAnnotations(this._notes)), Polymer.Annotations.prepElement = null
            } else this._notes = []
        },
        _processAnnotations: function(a) {
            for (var b = 0; b < a.length; b++) {
                for (var c = a[b], d = 0; d < c.bindings.length; d++)
                    for (var e = c.bindings[d], f = 0; f < e.parts.length; f++) {
                        var g = e.parts[f];
                        g.literal || (g.signature = this._parseMethod(g.value), g.signature || (g.model = this._modelForPath(g.value)))
                    }
                if (c.templateContent) {
                    this._processAnnotations(c.templateContent._notes);
                    var h = c.templateContent._parentProps = this._discoverTemplateParentProps(c.templateContent._notes),
                        i = [];
                    for (var j in h) i.push({
                        index: c.index,
                        kind: "property",
                        name: "_parent_" + j,
                        parts: [{
                            mode: "{",
                            model: j,
                            value: j
                        }]
                    });
                    c.bindings = c.bindings.concat(i)
                }
            }
        },
        _discoverTemplateParentProps: function(a) {
            for (var b, c = {}, d = 0; d < a.length && (b = a[d]); d++) {
                for (var e, f = 0, g = b.bindings; f < g.length && (e = g[f]); f++)
                    for (var h, i = 0, j = e.parts; i < j.length && (h = j[i]); i++)
                        if (h.signature)
                            for (var k = h.signature.args, l = 0; l < k.length; l++) {
                                var m = k[l].model;
                                m && (c[m] = !0)
                            } else h.model && (c[h.model] = !0);
                if (b.templateContent) {
                    var n = b.templateContent._parentProps;
                    Polymer.Base.mixin(c, n)
                }
            }
            return c
        },
        _prepElement: function(a) {
            Polymer.ResolveUrl.resolveAttrs(a, this._template.ownerDocument)
        },
        _findAnnotatedNode: Polymer.Annotations.findAnnotatedNode,
        _marshalAnnotationReferences: function() {
            this._template && (this._marshalIdNodes(), this._marshalAnnotatedNodes(), this._marshalAnnotatedListeners())
        },
        _configureAnnotationReferences: function(a) {
            for (var b = this._notes, c = this._nodes, d = 0; d < b.length; d++) {
                var e = b[d],
                    f = c[d];
                this._configureTemplateContent(e, f), this._configureCompoundBindings(e, f)
            }
        },
        _configureTemplateContent: function(a, b) {
            a.templateContent && (b._content = a.templateContent)
        },
        _configureCompoundBindings: function(a, b) {
            for (var c = a.bindings, d = 0; d < c.length; d++) {
                var e = c[d];
                if (e.isCompound) {
                    for (var f = b.__compoundStorage__ || (b.__compoundStorage__ = {}), g = e.parts, h = new Array(g.length), i = 0; i < g.length; i++) h[i] = g[i].literal;
                    var j = e.name;
                    f[j] = h, e.literal && "property" == e.kind && (b._configValue ? b._configValue(j, e.literal) : b[j] = e.literal)
                }
            }
        },
        _marshalIdNodes: function() {
            this.$ = {};
            for (var a, b = 0, c = this._notes.length; c > b && (a = this._notes[b]); b++) a.id && (this.$[a.id] = this._findAnnotatedNode(this.root, a))
        },
        _marshalAnnotatedNodes: function() {
            if (this._notes && this._notes.length) {
                for (var a = new Array(this._notes.length), b = 0; b < this._notes.length; b++) a[b] = this._findAnnotatedNode(this.root, this._notes[b]);
                this._nodes = a
            }
        },
        _marshalAnnotatedListeners: function() {
            for (var a, b = 0, c = this._notes.length; c > b && (a = this._notes[b]); b++)
                if (a.events && a.events.length)
                    for (var d, e = this._findAnnotatedNode(this.root, a), f = 0, g = a.events; f < g.length && (d = g[f]); f++) this.listen(e, d.name, d.value)
        }
    }), Polymer.Base._addFeature({
        listeners: {},
        _listenListeners: function(a) {
            var b, c, d;
            for (d in a) d.indexOf(".") < 0 ? (b = this, c = d) : (c = d.split("."), b = this.$[c[0]], c = c[1]), this.listen(b, c, a[d])
        },
        listen: function(a, b, c) {
            var d = this._recallEventHandler(this, b, a, c);
            d || (d = this._createEventHandler(a, b, c)), d._listening || (this._listen(a, b, d), d._listening = !0)
        },
        _boundListenerKey: function(a, b) {
            return a + ":" + b
        },
        _recordEventHandler: function(a, b, c, d, e) {
            var f = a.__boundListeners;
            f || (f = a.__boundListeners = new WeakMap);
            var g = f.get(c);
            g || (g = {}, f.set(c, g));
            var h = this._boundListenerKey(b, d);
            g[h] = e
        },
        _recallEventHandler: function(a, b, c, d) {
            var e = a.__boundListeners;
            if (e) {
                var f = e.get(c);
                if (f) {
                    var g = this._boundListenerKey(b, d);
                    return f[g]
                }
            }
        },
        _createEventHandler: function(a, b, c) {
            var d = this,
                e = function(a) {
                    d[c] ? d[c](a, a.detail) : d._warn(d._logf("_createEventHandler", "listener method `" + c + "` not defined"))
                };
            return e._listening = !1, this._recordEventHandler(d, b, a, c, e), e
        },
        unlisten: function(a, b, c) {
            var d = this._recallEventHandler(this, b, a, c);
            d && (this._unlisten(a, b, d), d._listening = !1)
        },
        _listen: function(a, b, c) {
            a.addEventListener(b, c)
        },
        _unlisten: function(a, b, c) {
            a.removeEventListener(b, c)
        }
    }),
    function() {
        "use strict";

        function a(a) {
            for (var b, c = 0; c < q.length; c++) b = q[c], a ? document.addEventListener(b, u, !0) : document.removeEventListener(b, u, !0)
        }

        function b() {
            if (!t) {
                v.mouse.mouseIgnoreJob || a(!0);
                var b = function() {
                    a(), v.mouse.target = null, v.mouse.mouseIgnoreJob = null
                };
                v.mouse.mouseIgnoreJob = Polymer.Debounce(v.mouse.mouseIgnoreJob, b, p)
            }
        }

        function c(a) {
            var b = a.type;
            if (-1 === q.indexOf(b)) return !1;
            if ("mousemove" === b) {
                var c = void 0 === a.buttons ? 1 : a.buttons;
                return a instanceof window.MouseEvent && !s && (c = r[a.which] || 0), Boolean(1 & c)
            }
            var d = void 0 === a.button ? 0 : a.button;
            return 0 === d
        }

        function d(a) {
            if ("click" === a.type) {
                if (0 === a.detail) return !0;
                var b = w.findOriginalTarget(a),
                    c = b.getBoundingClientRect(),
                    d = a.pageX,
                    e = a.pageY;
                return !(d >= c.left && d <= c.right && e >= c.top && e <= c.bottom)
            }
            return !1
        }

        function e(a) {
            for (var b, c = Polymer.dom(a).path, d = "auto", e = 0; e < c.length; e++)
                if (b = c[e], b[l]) {
                    d = b[l];
                    break
                }
            return d
        }

        function f(a, b, c) {
            a.movefn = b, a.upfn = c, document.addEventListener("mousemove", b), document.addEventListener("mouseup", c)
        }

        function g(a) {
            document.removeEventListener("mousemove", a.movefn), document.removeEventListener("mouseup", a.upfn), a.movefn = null, a.upfn = null
        }
        var h = Polymer.DomApi.wrap,
            i = "string" == typeof document.head.style.touchAction,
            j = "__polymerGestures",
            k = "__polymerGesturesHandled",
            l = "__polymerGesturesTouchAction",
            m = 25,
            n = 5,
            o = 2,
            p = 2500,
            q = ["mousedown", "mousemove", "mouseup", "click"],
            r = [0, 1, 4, 2],
            s = function() {
                try {
                    return 1 === new MouseEvent("test", {
                        buttons: 1
                    }).buttons
                } catch (a) {
                    return !1
                }
            }(),
            t = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/),
            u = function(a) {
                if (a[k] = {
                        skip: !0
                    }, "click" === a.type) {
                    for (var b = Polymer.dom(a).path, c = 0; c < b.length; c++)
                        if (b[c] === v.mouse.target) return;
                    a.preventDefault(), a.stopPropagation()
                }
            },
            v = {
                mouse: {
                    target: null,
                    mouseIgnoreJob: null
                },
                touch: {
                    x: 0,
                    y: 0,
                    id: -1,
                    scrollDecided: !1
                }
            },
            w = {
                gestures: {},
                recognizers: [],
                deepTargetFind: function(a, b) {
                    for (var c = document.elementFromPoint(a, b), d = c; d && d.shadowRoot;) d = d.shadowRoot.elementFromPoint(a, b), d && (c = d);
                    return c
                },
                findOriginalTarget: function(a) {
                    return a.path ? a.path[0] : a.target
                },
                handleNative: function(a) {
                    var c, d = a.type,
                        e = h(a.currentTarget),
                        f = e[j];
                    if (f) {
                        var g = f[d];
                        if (g) {
                            if (!a[k] && (a[k] = {}, "touch" === d.slice(0, 5))) {
                                var l = a.changedTouches[0];
                                if ("touchstart" === d && 1 === a.touches.length && (v.touch.id = l.identifier), v.touch.id !== l.identifier) return;
                                i || "touchstart" !== d && "touchmove" !== d || w.handleTouchAction(a), "touchend" === d && (v.mouse.target = Polymer.dom(a).rootTarget, b(!0))
                            }
                            if (c = a[k], !c.skip) {
                                for (var m, n = w.recognizers, o = 0; o < n.length; o++) m = n[o], g[m.name] && !c[m.name] && m.flow && m.flow.start.indexOf(a.type) > -1 && m.reset && m.reset();
                                for (var m, o = 0; o < n.length; o++) m = n[o], g[m.name] && !c[m.name] && (c[m.name] = !0, m[d](a))
                            }
                        }
                    }
                },
                handleTouchAction: function(a) {
                    var b = a.changedTouches[0],
                        c = a.type;
                    if ("touchstart" === c) v.touch.x = b.clientX, v.touch.y = b.clientY, v.touch.scrollDecided = !1;
                    else if ("touchmove" === c) {
                        if (v.touch.scrollDecided) return;
                        v.touch.scrollDecided = !0;
                        var d = e(a),
                            f = !1,
                            g = Math.abs(v.touch.x - b.clientX),
                            h = Math.abs(v.touch.y - b.clientY);
                        a.cancelable && ("none" === d ? f = !0 : "pan-x" === d ? f = h > g : "pan-y" === d && (f = g > h)), f ? a.preventDefault() : w.prevent("track")
                    }
                },
                add: function(a, b, c) {
                    a = h(a);
                    var d = this.gestures[b],
                        e = d.deps,
                        f = d.name,
                        g = a[j];
                    g || (a[j] = g = {});
                    for (var i, k, l = 0; l < e.length; l++) i = e[l], t && q.indexOf(i) > -1 || (k = g[i], k || (g[i] = k = {
                        _count: 0
                    }), 0 === k._count && a.addEventListener(i, this.handleNative), k[f] = (k[f] || 0) + 1, k._count = (k._count || 0) + 1);
                    a.addEventListener(b, c), d.touchAction && this.setTouchAction(a, d.touchAction)
                },
                remove: function(a, b, c) {
                    a = h(a);
                    var d = this.gestures[b],
                        e = d.deps,
                        f = d.name,
                        g = a[j];
                    if (g)
                        for (var i, k, l = 0; l < e.length; l++) i = e[l], k = g[i], k && k[f] && (k[f] = (k[f] || 1) - 1, k._count = (k._count || 1) - 1, 0 === k._count && a.removeEventListener(i, this.handleNative));
                    a.removeEventListener(b, c)
                },
                register: function(a) {
                    this.recognizers.push(a);
                    for (var b = 0; b < a.emits.length; b++) this.gestures[a.emits[b]] = a
                },
                findRecognizerByEvent: function(a) {
                    for (var b, c = 0; c < this.recognizers.length; c++) {
                        b = this.recognizers[c];
                        for (var d, e = 0; e < b.emits.length; e++)
                            if (d = b.emits[e], d === a) return b
                    }
                    return null
                },
                setTouchAction: function(a, b) {
                    i && (a.style.touchAction = b), a[l] = b
                },
                fire: function(a, b, c) {
                    var d = Polymer.Base.fire(b, c, {
                        node: a,
                        bubbles: !0,
                        cancelable: !0
                    });
                    if (d.defaultPrevented) {
                        var e = c.sourceEvent;
                        e && e.preventDefault && e.preventDefault()
                    }
                },
                prevent: function(a) {
                    var b = this.findRecognizerByEvent(a);
                    b.info && (b.info.prevent = !0)
                }
            };
        w.register({
            name: "downup",
            deps: ["mousedown", "touchstart", "touchend"],
            flow: {
                start: ["mousedown", "touchstart"],
                end: ["mouseup", "touchend"]
            },
            emits: ["down", "up"],
            info: {
                movefn: null,
                upfn: null
            },
            reset: function() {
                g(this.info)
            },
            mousedown: function(a) {
                if (c(a)) {
                    var b = w.findOriginalTarget(a),
                        d = this,
                        e = function(a) {
                            c(a) || (d.fire("up", b, a), g(d.info))
                        },
                        h = function(a) {
                            c(a) && d.fire("up", b, a), g(d.info)
                        };
                    f(this.info, e, h), this.fire("down", b, a)
                }
            },
            touchstart: function(a) {
                this.fire("down", w.findOriginalTarget(a), a.changedTouches[0])
            },
            touchend: function(a) {
                this.fire("up", w.findOriginalTarget(a), a.changedTouches[0])
            },
            fire: function(a, b, c) {
                w.fire(b, a, {
                    x: c.clientX,
                    y: c.clientY,
                    sourceEvent: c,
                    prevent: function(a) {
                        return w.prevent(a)
                    }
                })
            }
        }), w.register({
            name: "track",
            touchAction: "none",
            deps: ["mousedown", "touchstart", "touchmove", "touchend"],
            flow: {
                start: ["mousedown", "touchstart"],
                end: ["mouseup", "touchend"]
            },
            emits: ["track"],
            info: {
                x: 0,
                y: 0,
                state: "start",
                started: !1,
                moves: [],
                addMove: function(a) {
                    this.moves.length > o && this.moves.shift(), this.moves.push(a)
                },
                movefn: null,
                upfn: null,
                prevent: !1
            },
            reset: function() {
                this.info.state = "start", this.info.started = !1, this.info.moves = [], this.info.x = 0, this.info.y = 0, this.info.prevent = !1, g(this.info)
            },
            hasMovedEnough: function(a, b) {
                if (this.info.prevent) return !1;
                if (this.info.started) return !0;
                var c = Math.abs(this.info.x - a),
                    d = Math.abs(this.info.y - b);
                return c >= n || d >= n
            },
            mousedown: function(a) {
                if (c(a)) {
                    var b = w.findOriginalTarget(a),
                        d = this,
                        e = function(a) {
                            var e = a.clientX,
                                f = a.clientY;
                            d.hasMovedEnough(e, f) && (d.info.state = d.info.started ? "mouseup" === a.type ? "end" : "track" : "start", d.info.addMove({
                                x: e,
                                y: f
                            }), c(a) || (d.info.state = "end", g(d.info)), d.fire(b, a), d.info.started = !0)
                        },
                        h = function(a) {
                            d.info.started && (w.prevent("tap"), e(a)), g(d.info)
                        };
                    f(this.info, e, h), this.info.x = a.clientX, this.info.y = a.clientY
                }
            },
            touchstart: function(a) {
                var b = a.changedTouches[0];
                this.info.x = b.clientX, this.info.y = b.clientY
            },
            touchmove: function(a) {
                var b = w.findOriginalTarget(a),
                    c = a.changedTouches[0],
                    d = c.clientX,
                    e = c.clientY;
                this.hasMovedEnough(d, e) && (this.info.addMove({
                    x: d,
                    y: e
                }), this.fire(b, c), this.info.state = "track", this.info.started = !0)
            },
            touchend: function(a) {
                var b = w.findOriginalTarget(a),
                    c = a.changedTouches[0];
                this.info.started && (w.prevent("tap"), this.info.state = "end", this.info.addMove({
                    x: c.clientX,
                    y: c.clientY
                }), this.fire(b, c))
            },
            fire: function(a, b) {
                var c, d = this.info.moves[this.info.moves.length - 2],
                    e = this.info.moves[this.info.moves.length - 1],
                    f = e.x - this.info.x,
                    g = e.y - this.info.y,
                    h = 0;
                return d && (c = e.x - d.x, h = e.y - d.y), w.fire(a, "track", {
                    state: this.info.state,
                    x: b.clientX,
                    y: b.clientY,
                    dx: f,
                    dy: g,
                    ddx: c,
                    ddy: h,
                    sourceEvent: b,
                    hover: function() {
                        return w.deepTargetFind(b.clientX, b.clientY)
                    }
                })
            }
        }), w.register({
            name: "tap",
            deps: ["mousedown", "click", "touchstart", "touchend"],
            flow: {
                start: ["mousedown", "touchstart"],
                end: ["click", "touchend"]
            },
            emits: ["tap"],
            info: {
                x: NaN,
                y: NaN,
                prevent: !1
            },
            reset: function() {
                this.info.x = NaN, this.info.y = NaN, this.info.prevent = !1
            },
            save: function(a) {
                this.info.x = a.clientX, this.info.y = a.clientY
            },
            mousedown: function(a) {
                c(a) && this.save(a)
            },
            click: function(a) {
                c(a) && this.forward(a)
            },
            touchstart: function(a) {
                this.save(a.changedTouches[0])
            },
            touchend: function(a) {
                this.forward(a.changedTouches[0])
            },
            forward: function(a) {
                var b = Math.abs(a.clientX - this.info.x),
                    c = Math.abs(a.clientY - this.info.y),
                    e = w.findOriginalTarget(a);
                (isNaN(b) || isNaN(c) || m >= b && m >= c || d(a)) && (this.info.prevent || w.fire(e, "tap", {
                    x: a.clientX,
                    y: a.clientY,
                    sourceEvent: a
                }))
            }
        });
        var x = {
            x: "pan-x",
            y: "pan-y",
            none: "none",
            all: "auto"
        };
        Polymer.Base._addFeature({
            _setupGestures: function() {
                this.__polymerGestures = null
            },
            _listen: function(a, b, c) {
                w.gestures[b] ? w.add(a, b, c) : a.addEventListener(b, c)
            },
            _unlisten: function(a, b, c) {
                w.gestures[b] ? w.remove(a, b, c) : a.removeEventListener(b, c)
            },
            setScrollDirection: function(a, b) {
                b = b || this, w.setTouchAction(b, x[a] || "auto")
            }
        }), Polymer.Gestures = w
    }(), Polymer.Base._addFeature({
        $$: function(a) {
            return Polymer.dom(this.root).querySelector(a)
        },
        toggleClass: function(a, b, c) {
            c = c || this, 1 == arguments.length && (b = !c.classList.contains(a)), b ? Polymer.dom(c).classList.add(a) : Polymer.dom(c).classList.remove(a)
        },
        toggleAttribute: function(a, b, c) {
            c = c || this, 1 == arguments.length && (b = !c.hasAttribute(a)), b ? Polymer.dom(c).setAttribute(a, "") : Polymer.dom(c).removeAttribute(a)
        },
        classFollows: function(a, b, c) {
            c && Polymer.dom(c).classList.remove(a), b && Polymer.dom(b).classList.add(a)
        },
        attributeFollows: function(a, b, c) {
            c && Polymer.dom(c).removeAttribute(a), b && Polymer.dom(b).setAttribute(a, "")
        },
        getEffectiveChildNodes: function() {
            return Polymer.dom(this).getEffectiveChildNodes()
        },
        getEffectiveChildren: function() {
            var a = Polymer.dom(this).getEffectiveChildNodes();
            return a.filter(function(a) {
                return a.nodeType === Node.ELEMENT_NODE
            })
        },
        getEffectiveTextContent: function() {
            for (var a, b = this.getEffectiveChildNodes(), c = [], d = 0; a = b[d]; d++) a.nodeType !== Node.COMMENT_NODE && c.push(Polymer.dom(a).textContent);
            return c.join("")
        },
        queryEffectiveChildren: function(a) {
            var b = Polymer.dom(this).queryDistributedElements(a);
            return b && b[0]
        },
        queryAllEffectiveChildren: function(a) {
            return Polymer.dom(this).queryDistributedElements(a)
        },
        getContentChildNodes: function(a) {
            var b = Polymer.dom(this.root).querySelector(a || "content");
            return b ? Polymer.dom(b).getDistributedNodes() : []
        },
        getContentChildren: function(a) {
            return this.getContentChildNodes(a).filter(function(a) {
                return a.nodeType === Node.ELEMENT_NODE
            })
        },
        fire: function(a, b, c) {
            c = c || Polymer.nob;
            var d = c.node || this,
                b = null === b || void 0 === b ? {} : b,
                e = void 0 === c.bubbles ? !0 : c.bubbles,
                f = Boolean(c.cancelable),
                g = c._useCache,
                h = this._getEvent(a, e, f, g);
            return h.detail = b, g && (this.__eventCache[a] = null), d.dispatchEvent(h), g && (this.__eventCache[a] = h), h
        },
        __eventCache: {},
        _getEvent: function(a, b, c, d) {
            var e = d && this.__eventCache[a];
            return e && e.bubbles == b && e.cancelable == c || (e = new Event(a, {
                bubbles: Boolean(b),
                cancelable: c
            })), e
        },
        async: function(a, b) {
            var c = this;
            return Polymer.Async.run(function() {
                a.call(c)
            }, b)
        },
        cancelAsync: function(a) {
            Polymer.Async.cancel(a)
        },
        arrayDelete: function(a, b) {
            var c;
            if (Array.isArray(a)) {
                if (c = a.indexOf(b), c >= 0) return a.splice(c, 1)
            } else {
                var d = this._get(a);
                if (c = d.indexOf(b), c >= 0) return this.splice(a, c, 1)
            }
        },
        transform: function(a, b) {
            b = b || this, b.style.webkitTransform = a, b.style.transform = a
        },
        translate3d: function(a, b, c, d) {
            d = d || this, this.transform("translate3d(" + a + "," + b + "," + c + ")", d)
        },
        importHref: function(a, b, c, d) {
            var e = document.createElement("link");
            e.rel = "import", e.href = a, d = Boolean(d), d && e.setAttribute("async", "");
            var f = this;
            return b && (e.onload = function(a) {
                return b.call(f, a)
            }), c && (e.onerror = function(a) {
                return c.call(f, a)
            }), document.head.appendChild(e), e
        },
        create: function(a, b) {
            var c = document.createElement(a);
            if (b)
                for (var d in b) c[d] = b[d];
            return c
        },
        isLightDescendant: function(a) {
            return this !== a && this.contains(a) && Polymer.dom(this).getOwnerRoot() === Polymer.dom(a).getOwnerRoot()
        },
        isLocalDescendant: function(a) {
            return this.root === Polymer.dom(a).getOwnerRoot()
        }
    }), Polymer.Bind = {
        _dataEventCache: {},
        prepareModel: function(a) {
            Polymer.Base.mixin(a, this._modelApi)
        },
        _modelApi: {
            _notifyChange: function(a, b, c) {
                c = void 0 === c ? this[a] : c, b = b || Polymer.CaseMap.camelToDashCase(a) + "-changed", this.fire(b, {
                    value: c
                }, {
                    bubbles: !1,
                    cancelable: !1,
                    _useCache: !0
                })
            },
            _propertySetter: function(a, b, c, d) {
                var e = this.__data__[a];
                return e === b || e !== e && b !== b || (this.__data__[a] = b, "object" == typeof b && this._clearPath(a), this._propertyChanged && this._propertyChanged(a, b, e), c && this._effectEffects(a, b, c, e, d)), e
            },
            __setProperty: function(a, b, c, d) {
                d = d || this;
                var e = d._propertyEffects && d._propertyEffects[a];
                e ? d._propertySetter(a, b, e, c) : d[a] = b
            },
            _effectEffects: function(a, b, c, d, e) {
                for (var f, g = 0, h = c.length; h > g && (f = c[g]); g++) f.fn.call(this, a, b, f.effect, d, e)
            },
            _clearPath: function(a) {
                for (var b in this.__data__) 0 === b.indexOf(a + ".") && (this.__data__[b] = void 0)
            }
        },
        ensurePropertyEffects: function(a, b) {
            a._propertyEffects || (a._propertyEffects = {});
            var c = a._propertyEffects[b];
            return c || (c = a._propertyEffects[b] = []), c
        },
        addPropertyEffect: function(a, b, c, d) {
            var e = this.ensurePropertyEffects(a, b),
                f = {
                    kind: c,
                    effect: d,
                    fn: Polymer.Bind["_" + c + "Effect"]
                };
            return e.push(f), f
        },
        createBindings: function(a) {
            var b = a._propertyEffects;
            if (b)
                for (var c in b) {
                    var d = b[c];
                    d.sort(this._sortPropertyEffects), this._createAccessors(a, c, d)
                }
        },
        _sortPropertyEffects: function() {
            var a = {
                compute: 0,
                annotation: 1,
                computedAnnotation: 2,
                reflect: 3,
                notify: 4,
                observer: 5,
                complexObserver: 6,
                "function": 7
            };
            return function(b, c) {
                return a[b.kind] - a[c.kind]
            }
        }(),
        _createAccessors: function(a, b, c) {
            var d = {
                    get: function() {
                        return this.__data__[b]
                    }
                },
                e = function(a) {
                    this._propertySetter(b, a, c)
                },
                f = a.getPropertyInfo && a.getPropertyInfo(b);
            f && f.readOnly ? f.computed || (a["_set" + this.upper(b)] = e) : d.set = e, Object.defineProperty(a, b, d)
        },
        upper: function(a) {
            return a[0].toUpperCase() + a.substring(1)
        },
        _addAnnotatedListener: function(a, b, c, d, e) {
            a._bindListeners || (a._bindListeners = []);
            var f = this._notedListenerFactory(c, d, this._isStructured(d)),
                g = e || Polymer.CaseMap.camelToDashCase(c) + "-changed";
            a._bindListeners.push({
                index: b,
                property: c,
                path: d,
                changedFn: f,
                event: g
            })
        },
        _isStructured: function(a) {
            return a.indexOf(".") > 0
        },
        _isEventBogus: function(a, b) {
            return a.path && a.path[0] !== b
        },
        _notedListenerFactory: function(a, b, c) {
            return function(d, e, f) {
                f ? this._notifyPath(this._fixPath(b, a, f), e) : (e = d[a], c ? this.__data__[b] != e && this.set(b, e) : this[b] = e)
            }
        },
        prepareInstance: function(a) {
            a.__data__ = Object.create(null)
        },
        setupBindListeners: function(a) {
            for (var b, c = a._bindListeners, d = 0, e = c.length; e > d && (b = c[d]); d++) {
                var f = a._nodes[b.index];
                this._addNotifyListener(f, a, b.event, b.changedFn)
            }
        },
        _addNotifyListener: function(a, b, c, d) {
            a.addEventListener(c, function(a) {
                return b._notifyListener(d, a)
            })
        }
    }, Polymer.Base.extend(Polymer.Bind, {
        _shouldAddListener: function(a) {
            return a.name && "attribute" != a.kind && "text" != a.kind && !a.isCompound && "{" === a.parts[0].mode && !a.parts[0].negate
        },
        _annotationEffect: function(a, b, c) {
            a != c.value && (b = this._get(c.value), this.__data__[c.value] = b);
            var d = c.negate ? !b : b;
            return c.customEvent && this._nodes[c.index][c.name] === d ? void 0 : this._applyEffectValue(c, d)
        },
        _reflectEffect: function(a, b, c) {
            this.reflectPropertyToAttribute(a, c.attribute, b)
        },
        _notifyEffect: function(a, b, c, d, e) {
            e || this._notifyChange(a, c.event, b)
        },
        _functionEffect: function(a, b, c, d, e) {
            c.call(this, a, b, d, e)
        },
        _observerEffect: function(a, b, c, d) {
            var e = this[c.method];
            e ? e.call(this, b, d) : this._warn(this._logf("_observerEffect", "observer method `" + c.method + "` not defined"))
        },
        _complexObserverEffect: function(a, b, c) {
            var d = this[c.method];
            if (d) {
                var e = Polymer.Bind._marshalArgs(this.__data__, c, a, b);
                e && d.apply(this, e)
            } else this._warn(this._logf("_complexObserverEffect", "observer method `" + c.method + "` not defined"))
        },
        _computeEffect: function(a, b, c) {
            var d = Polymer.Bind._marshalArgs(this.__data__, c, a, b);
            if (d) {
                var e = this[c.method];
                e ? this.__setProperty(c.name, e.apply(this, d)) : this._warn(this._logf("_computeEffect", "compute method `" + c.method + "` not defined"));
            }
        },
        _annotatedComputationEffect: function(a, b, c) {
            var d = this._rootDataHost || this,
                e = d[c.method];
            if (e) {
                var f = Polymer.Bind._marshalArgs(this.__data__, c, a, b);
                if (f) {
                    var g = e.apply(d, f);
                    c.negate && (g = !g), this._applyEffectValue(c, g)
                }
            } else d._warn(d._logf("_annotatedComputationEffect", "compute method `" + c.method + "` not defined"))
        },
        _marshalArgs: function(a, b, c, d) {
            for (var e = [], f = b.args, g = 0, h = f.length; h > g; g++) {
                var i, j = f[g],
                    k = j.name;
                if (i = j.literal ? j.value : j.structured ? Polymer.Base._get(k, a) : a[k], f.length > 1 && void 0 === i) return;
                if (j.wildcard) {
                    var l = 0 === k.indexOf(c + "."),
                        m = 0 === b.trigger.name.indexOf(k) && !l;
                    e[g] = {
                        path: m ? c : k,
                        value: m ? d : i,
                        base: i
                    }
                } else e[g] = i
            }
            return e
        }
    }), Polymer.Base._addFeature({
        _addPropertyEffect: function(a, b, c) {
            var d = Polymer.Bind.addPropertyEffect(this, a, b, c);
            d.pathFn = this["_" + d.kind + "PathEffect"]
        },
        _prepEffects: function() {
            Polymer.Bind.prepareModel(this), this._addAnnotationEffects(this._notes)
        },
        _prepBindings: function() {
            Polymer.Bind.createBindings(this)
        },
        _addPropertyEffects: function(a) {
            if (a)
                for (var b in a) {
                    var c = a[b];
                    c.observer && this._addObserverEffect(b, c.observer), c.computed && (c.readOnly = !0, this._addComputedEffect(b, c.computed)), c.notify && this._addPropertyEffect(b, "notify", {
                        event: Polymer.CaseMap.camelToDashCase(b) + "-changed"
                    }), c.reflectToAttribute && this._addPropertyEffect(b, "reflect", {
                        attribute: Polymer.CaseMap.camelToDashCase(b)
                    }), c.readOnly && Polymer.Bind.ensurePropertyEffects(this, b)
                }
        },
        _addComputedEffect: function(a, b) {
            for (var c, d = this._parseMethod(b), e = 0; e < d.args.length && (c = d.args[e]); e++) this._addPropertyEffect(c.model, "compute", {
                method: d.method,
                args: d.args,
                trigger: c,
                name: a
            })
        },
        _addObserverEffect: function(a, b) {
            this._addPropertyEffect(a, "observer", {
                method: b,
                property: a
            })
        },
        _addComplexObserverEffects: function(a) {
            if (a)
                for (var b, c = 0; c < a.length && (b = a[c]); c++) this._addComplexObserverEffect(b)
        },
        _addComplexObserverEffect: function(a) {
            var b = this._parseMethod(a);
            if (!b) throw new Error("Malformed observer expression '" + a + "'");
            for (var c, d = 0; d < b.args.length && (c = b.args[d]); d++) this._addPropertyEffect(c.model, "complexObserver", {
                method: b.method,
                args: b.args,
                trigger: c
            })
        },
        _addAnnotationEffects: function(a) {
            for (var b, c = 0; c < a.length && (b = a[c]); c++)
                for (var d, e = b.bindings, f = 0; f < e.length && (d = e[f]); f++) this._addAnnotationEffect(d, c)
        },
        _addAnnotationEffect: function(a, b) {
            Polymer.Bind._shouldAddListener(a) && Polymer.Bind._addAnnotatedListener(this, b, a.name, a.parts[0].value, a.parts[0].event);
            for (var c = 0; c < a.parts.length; c++) {
                var d = a.parts[c];
                d.signature ? this._addAnnotatedComputationEffect(a, d, b) : d.literal || this._addPropertyEffect(d.model, "annotation", {
                    kind: a.kind,
                    index: b,
                    name: a.name,
                    value: d.value,
                    isCompound: a.isCompound,
                    compoundIndex: d.compoundIndex,
                    event: d.event,
                    customEvent: d.customEvent,
                    negate: d.negate
                })
            }
        },
        _addAnnotatedComputationEffect: function(a, b, c) {
            var d = b.signature;
            if (d["static"]) this.__addAnnotatedComputationEffect("__static__", c, a, b, null);
            else
                for (var e, f = 0; f < d.args.length && (e = d.args[f]); f++) e.literal || this.__addAnnotatedComputationEffect(e.model, c, a, b, e)
        },
        __addAnnotatedComputationEffect: function(a, b, c, d, e) {
            this._addPropertyEffect(a, "annotatedComputation", {
                index: b,
                isCompound: c.isCompound,
                compoundIndex: d.compoundIndex,
                kind: c.kind,
                name: c.name,
                negate: d.negate,
                method: d.signature.method,
                args: d.signature.args,
                trigger: e
            })
        },
        _parseMethod: function(a) {
            var b = a.match(/([^\s]+?)\((.*)\)/);
            if (b) {
                var c = {
                    method: b[1],
                    "static": !0
                };
                if (b[2].trim()) {
                    var d = b[2].replace(/\\,/g, "&comma;").split(",");
                    return this._parseArgs(d, c)
                }
                return c.args = Polymer.nar, c
            }
        },
        _parseArgs: function(a, b) {
            return b.args = a.map(function(a) {
                var c = this._parseArg(a);
                return c.literal || (b["static"] = !1), c
            }, this), b
        },
        _parseArg: function(a) {
            var b = a.trim().replace(/&comma;/g, ",").replace(/\\(.)/g, "$1"),
                c = {
                    name: b
                },
                d = b[0];
            switch ("-" === d && (d = b[1]), d >= "0" && "9" >= d && (d = "#"), d) {
                case "'":
                case '"':
                    c.value = b.slice(1, -1), c.literal = !0;
                    break;
                case "#":
                    c.value = Number(b), c.literal = !0
            }
            return c.literal || (c.model = this._modelForPath(b), c.structured = b.indexOf(".") > 0, c.structured && (c.wildcard = ".*" == b.slice(-2), c.wildcard && (c.name = b.slice(0, -2)))), c
        },
        _marshalInstanceEffects: function() {
            Polymer.Bind.prepareInstance(this), this._bindListeners && Polymer.Bind.setupBindListeners(this)
        },
        _applyEffectValue: function(a, b) {
            var c = this._nodes[a.index],
                d = a.name;
            if (a.isCompound) {
                var e = c.__compoundStorage__[d];
                e[a.compoundIndex] = b, b = e.join("")
            }
            if ("attribute" == a.kind) this.serializeValueToAttribute(b, d, c);
            else {
                "className" === d && (b = this._scopeElementClass(c, b)), ("textContent" === d || "input" == c.localName && "value" == d) && (b = void 0 == b ? "" : b);
                var f;
                c._propertyInfo && (f = c._propertyInfo[d]) && f.readOnly || this.__setProperty(d, b, !1, c)
            }
        },
        _executeStaticEffects: function() {
            this._propertyEffects && this._propertyEffects.__static__ && this._effectEffects("__static__", null, this._propertyEffects.__static__)
        }
    }), Polymer.Base._addFeature({
        _setupConfigure: function(a) {
            if (this._config = {}, this._handlers = [], this._aboveConfig = null, a)
                for (var b in a) void 0 !== a[b] && (this._config[b] = a[b])
        },
        _marshalAttributes: function() {
            this._takeAttributesToModel(this._config)
        },
        _attributeChangedImpl: function(a) {
            var b = this._clientsReadied ? this : this._config;
            this._setAttributeToProperty(b, a)
        },
        _configValue: function(a, b) {
            var c = this._propertyInfo[a];
            c && c.readOnly || (this._config[a] = b)
        },
        _beforeClientsReady: function() {
            this._configure()
        },
        _configure: function() {
            this._configureAnnotationReferences(), this._aboveConfig = this.mixin({}, this._config);
            for (var a = {}, b = 0; b < this.behaviors.length; b++) this._configureProperties(this.behaviors[b].properties, a);
            this._configureProperties(this.properties, a), this.mixin(a, this._aboveConfig), this._config = a, this._clients && this._clients.length && this._distributeConfig(this._config)
        },
        _configureProperties: function(a, b) {
            for (var c in a) {
                var d = a[c];
                if (void 0 !== d.value) {
                    var e = d.value;
                    "function" == typeof e && (e = e.call(this, this._config)), b[c] = e
                }
            }
        },
        _distributeConfig: function(a) {
            var b = this._propertyEffects;
            if (b)
                for (var c in a) {
                    var d = b[c];
                    if (d)
                        for (var e, f = 0, g = d.length; g > f && (e = d[f]); f++)
                            if ("annotation" === e.kind && !e.isCompound) {
                                var h = this._nodes[e.effect.index];
                                if (h._configValue) {
                                    var i = c === e.effect.value ? a[c] : this._get(e.effect.value, a);
                                    h._configValue(e.effect.name, i)
                                }
                            }
                }
        },
        _afterClientsReady: function() {
            this._executeStaticEffects(), this._applyConfig(this._config, this._aboveConfig), this._flushHandlers()
        },
        _applyConfig: function(a, b) {
            for (var c in a) void 0 === this[c] && this.__setProperty(c, a[c], c in b)
        },
        _notifyListener: function(a, b) {
            if (!Polymer.Bind._isEventBogus(b, b.target)) {
                var c, d;
                if (b.detail && (c = b.detail.value, d = b.detail.path), this._clientsReadied) return a.call(this, b.target, c, d);
                this._queueHandler([a, b.target, c, d])
            }
        },
        _queueHandler: function(a) {
            this._handlers.push(a)
        },
        _flushHandlers: function() {
            for (var a, b = this._handlers, c = 0, d = b.length; d > c && (a = b[c]); c++) a[0].call(this, a[1], a[2], a[3]);
            this._handlers = []
        }
    }),
    function() {
        "use strict";
        Polymer.Base._addFeature({
            notifyPath: function(a, b, c) {
                var d = {};
                this._get(a, this, d), d.path && this._notifyPath(d.path, b, c)
            },
            _notifyPath: function(a, b, c) {
                var d = this._propertySetter(a, b);
                return d === b || d !== d && b !== b ? void 0 : (this._pathEffector(a, b), c || this._notifyPathUp(a, b), !0)
            },
            _getPathParts: function(a) {
                if (Array.isArray(a)) {
                    for (var b = [], c = 0; c < a.length; c++)
                        for (var d = a[c].toString().split("."), e = 0; e < d.length; e++) b.push(d[e]);
                    return b
                }
                return a.toString().split(".")
            },
            set: function(a, b, c) {
                var d, e = c || this,
                    f = this._getPathParts(a),
                    g = f[f.length - 1];
                if (f.length > 1) {
                    for (var h = 0; h < f.length - 1; h++) {
                        var i = f[h];
                        if (d && "#" == i[0] ? e = Polymer.Collection.get(d).getItem(i) : (e = e[i], d && parseInt(i, 10) == i && (f[h] = Polymer.Collection.get(d).getKey(e))), !e) return;
                        d = Array.isArray(e) ? e : null
                    }
                    if (d) {
                        var j = Polymer.Collection.get(d);
                        if ("#" == g[0]) {
                            var k = g,
                                l = j.getItem(k);
                            g = d.indexOf(l), j.setItem(k, b)
                        } else if (parseInt(g, 10) == g) {
                            var l = e[g],
                                k = j.getKey(l);
                            f[h] = k, j.setItem(k, b)
                        }
                    }
                    e[g] = b, c || this._notifyPath(f.join("."), b)
                } else e[a] = b
            },
            get: function(a, b) {
                return this._get(a, b)
            },
            _get: function(a, b, c) {
                for (var d, e = b || this, f = this._getPathParts(a), g = 0; g < f.length; g++) {
                    if (!e) return;
                    var h = f[g];
                    d && "#" == h[0] ? e = Polymer.Collection.get(d).getItem(h) : (e = e[h], c && d && parseInt(h, 10) == h && (f[g] = Polymer.Collection.get(d).getKey(e))), d = Array.isArray(e) ? e : null
                }
                return c && (c.path = f.join(".")), e
            },
            _pathEffector: function(a, b) {
                var c = this._modelForPath(a),
                    d = this._propertyEffects && this._propertyEffects[c];
                if (d)
                    for (var e, f = 0; f < d.length && (e = d[f]); f++) {
                        var g = e.pathFn;
                        g && g.call(this, a, b, e.effect)
                    }
                this._boundPaths && this._notifyBoundPaths(a, b)
            },
            _annotationPathEffect: function(a, b, c) {
                if (c.value === a || 0 === c.value.indexOf(a + ".")) Polymer.Bind._annotationEffect.call(this, a, b, c);
                else if (0 === a.indexOf(c.value + ".") && !c.negate) {
                    var d = this._nodes[c.index];
                    if (d && d._notifyPath) {
                        var e = this._fixPath(c.name, c.value, a);
                        d._notifyPath(e, b, !0)
                    }
                }
            },
            _complexObserverPathEffect: function(a, b, c) {
                this._pathMatchesEffect(a, c) && Polymer.Bind._complexObserverEffect.call(this, a, b, c)
            },
            _computePathEffect: function(a, b, c) {
                this._pathMatchesEffect(a, c) && Polymer.Bind._computeEffect.call(this, a, b, c)
            },
            _annotatedComputationPathEffect: function(a, b, c) {
                this._pathMatchesEffect(a, c) && Polymer.Bind._annotatedComputationEffect.call(this, a, b, c)
            },
            _pathMatchesEffect: function(a, b) {
                var c = b.trigger.name;
                return c == a || 0 === c.indexOf(a + ".") || b.trigger.wildcard && 0 === a.indexOf(c)
            },
            linkPaths: function(a, b) {
                this._boundPaths = this._boundPaths || {}, b ? this._boundPaths[a] = b : this.unlinkPaths(a)
            },
            unlinkPaths: function(a) {
                this._boundPaths && delete this._boundPaths[a]
            },
            _notifyBoundPaths: function(a, b) {
                for (var c in this._boundPaths) {
                    var d = this._boundPaths[c];
                    0 == a.indexOf(c + ".") ? this._notifyPath(this._fixPath(d, c, a), b) : 0 == a.indexOf(d + ".") && this._notifyPath(this._fixPath(c, d, a), b)
                }
            },
            _fixPath: function(a, b, c) {
                return a + c.slice(b.length)
            },
            _notifyPathUp: function(a, b) {
                var c = this._modelForPath(a),
                    d = Polymer.CaseMap.camelToDashCase(c),
                    e = d + this._EVENT_CHANGED;
                this.fire(e, {
                    path: a,
                    value: b
                }, {
                    bubbles: !1,
                    _useCache: !0
                })
            },
            _modelForPath: function(a) {
                var b = a.indexOf(".");
                return 0 > b ? a : a.slice(0, b)
            },
            _EVENT_CHANGED: "-changed",
            notifySplices: function(a, b) {
                var c = {},
                    d = this._get(a, this, c);
                this._notifySplices(d, c.path, b)
            },
            _notifySplices: function(a, b, c) {
                var d = {
                    keySplices: Polymer.Collection.applySplices(a, c),
                    indexSplices: c
                };
                a.hasOwnProperty("splices") || Object.defineProperty(a, "splices", {
                    configurable: !0,
                    writable: !0
                }), a.splices = d, this._notifyPath(b + ".splices", d), this._notifyPath(b + ".length", a.length), d.keySplices = null, d.indexSplices = null
            },
            _notifySplice: function(a, b, c, d, e) {
                this._notifySplices(a, b, [{
                    index: c,
                    addedCount: d,
                    removed: e,
                    object: a,
                    type: "splice"
                }])
            },
            push: function(a) {
                var b = {},
                    c = this._get(a, this, b),
                    d = Array.prototype.slice.call(arguments, 1),
                    e = c.length,
                    f = c.push.apply(c, d);
                return d.length && this._notifySplice(c, b.path, e, d.length, []), f
            },
            pop: function(a) {
                var b = {},
                    c = this._get(a, this, b),
                    d = Boolean(c.length),
                    e = Array.prototype.slice.call(arguments, 1),
                    f = c.pop.apply(c, e);
                return d && this._notifySplice(c, b.path, c.length, 0, [f]), f
            },
            splice: function(a, b, c) {
                var d = {},
                    e = this._get(a, this, d);
                b = 0 > b ? e.length - Math.floor(-b) : Math.floor(b), b || (b = 0);
                var f = Array.prototype.slice.call(arguments, 1),
                    g = e.splice.apply(e, f),
                    h = Math.max(f.length - 2, 0);
                return (h || g.length) && this._notifySplice(e, d.path, b, h, g), g
            },
            shift: function(a) {
                var b = {},
                    c = this._get(a, this, b),
                    d = Boolean(c.length),
                    e = Array.prototype.slice.call(arguments, 1),
                    f = c.shift.apply(c, e);
                return d && this._notifySplice(c, b.path, 0, 0, [f]), f
            },
            unshift: function(a) {
                var b = {},
                    c = this._get(a, this, b),
                    d = Array.prototype.slice.call(arguments, 1),
                    e = c.unshift.apply(c, d);
                return d.length && this._notifySplice(c, b.path, 0, d.length, []), e
            },
            prepareModelNotifyPath: function(a) {
                this.mixin(a, {
                    fire: Polymer.Base.fire,
                    _getEvent: Polymer.Base._getEvent,
                    __eventCache: Polymer.Base.__eventCache,
                    notifyPath: Polymer.Base.notifyPath,
                    _get: Polymer.Base._get,
                    _EVENT_CHANGED: Polymer.Base._EVENT_CHANGED,
                    _notifyPath: Polymer.Base._notifyPath,
                    _notifyPathUp: Polymer.Base._notifyPathUp,
                    _pathEffector: Polymer.Base._pathEffector,
                    _annotationPathEffect: Polymer.Base._annotationPathEffect,
                    _complexObserverPathEffect: Polymer.Base._complexObserverPathEffect,
                    _annotatedComputationPathEffect: Polymer.Base._annotatedComputationPathEffect,
                    _computePathEffect: Polymer.Base._computePathEffect,
                    _modelForPath: Polymer.Base._modelForPath,
                    _pathMatchesEffect: Polymer.Base._pathMatchesEffect,
                    _notifyBoundPaths: Polymer.Base._notifyBoundPaths,
                    _getPathParts: Polymer.Base._getPathParts
                })
            }
        })
    }(), Polymer.Base._addFeature({
        resolveUrl: function(a) {
            var b = Polymer.DomModule["import"](this.is),
                c = "";
            if (b) {
                var d = b.getAttribute("assetpath") || "";
                c = Polymer.ResolveUrl.resolveUrl(d, b.ownerDocument.baseURI)
            }
            return Polymer.ResolveUrl.resolveUrl(a, c)
        }
    }), Polymer.CssParse = function() {
        return {
            parse: function(a) {
                return a = this._clean(a), this._parseCss(this._lex(a), a)
            },
            _clean: function(a) {
                return a.replace(this._rx.comments, "").replace(this._rx.port, "")
            },
            _lex: function(a) {
                for (var b = {
                        start: 0,
                        end: a.length
                    }, c = b, d = 0, e = a.length; e > d; d++) switch (a[d]) {
                    case this.OPEN_BRACE:
                        c.rules || (c.rules = []);
                        var f = c,
                            g = f.rules[f.rules.length - 1];
                        c = {
                            start: d + 1,
                            parent: f,
                            previous: g
                        }, f.rules.push(c);
                        break;
                    case this.CLOSE_BRACE:
                        c.end = d + 1, c = c.parent || b
                }
                return b
            },
            _parseCss: function(a, b) {
                var c = b.substring(a.start, a.end - 1);
                if (a.parsedCssText = a.cssText = c.trim(), a.parent) {
                    var d = a.previous ? a.previous.end : a.parent.start;
                    c = b.substring(d, a.start - 1), c = this._expandUnicodeEscapes(c), c = c.replace(this._rx.multipleSpaces, " "), c = c.substring(c.lastIndexOf(";") + 1);
                    var e = a.parsedSelector = a.selector = c.trim();
                    a.atRule = 0 === e.indexOf(this.AT_START), a.atRule ? 0 === e.indexOf(this.MEDIA_START) ? a.type = this.types.MEDIA_RULE : e.match(this._rx.keyframesRule) && (a.type = this.types.KEYFRAMES_RULE) : 0 === e.indexOf(this.VAR_START) ? a.type = this.types.MIXIN_RULE : a.type = this.types.STYLE_RULE
                }
                var f = a.rules;
                if (f)
                    for (var g, h = 0, i = f.length; i > h && (g = f[h]); h++) this._parseCss(g, b);
                return a
            },
            _expandUnicodeEscapes: function(a) {
                return a.replace(/\\([0-9a-f]{1,6})\s/gi, function() {
                    for (var a = arguments[1], b = 6 - a.length; b--;) a = "0" + a;
                    return "\\" + a
                })
            },
            stringify: function(a, b, c) {
                c = c || "";
                var d = "";
                if (a.cssText || a.rules) {
                    var e = a.rules;
                    if (!e || !b && this._hasMixinRules(e)) d = b ? a.cssText : this.removeCustomProps(a.cssText), d = d.trim(), d && (d = "  " + d + "\n");
                    else
                        for (var f, g = 0, h = e.length; h > g && (f = e[g]); g++) d = this.stringify(f, b, d)
                }
                return d && (a.selector && (c += a.selector + " " + this.OPEN_BRACE + "\n"), c += d, a.selector && (c += this.CLOSE_BRACE + "\n\n")), c
            },
            _hasMixinRules: function(a) {
                return 0 === a[0].selector.indexOf(this.VAR_START)
            },
            removeCustomProps: function(a) {
                return a = this.removeCustomPropAssignment(a), this.removeCustomPropApply(a)
            },
            removeCustomPropAssignment: function(a) {
                return a.replace(this._rx.customProp, "").replace(this._rx.mixinProp, "")
            },
            removeCustomPropApply: function(a) {
                return a.replace(this._rx.mixinApply, "").replace(this._rx.varApply, "")
            },
            types: {
                STYLE_RULE: 1,
                KEYFRAMES_RULE: 7,
                MEDIA_RULE: 4,
                MIXIN_RULE: 1e3
            },
            OPEN_BRACE: "{",
            CLOSE_BRACE: "}",
            _rx: {
                comments: /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
                port: /@import[^;]*;/gim,
                customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
                mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
                mixinApply: /@apply[\s]*\([^)]*?\)[\s]*(?:[;\n]|$)?/gim,
                varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
                keyframesRule: /^@[^\s]*keyframes/,
                multipleSpaces: /\s+/g
            },
            VAR_START: "--",
            MEDIA_START: "@media",
            AT_START: "@"
        }
    }(), Polymer.StyleUtil = function() {
        return {
            MODULE_STYLES_SELECTOR: "style, link[rel=import][type~=css], template",
            INCLUDE_ATTR: "include",
            toCssText: function(a, b, c) {
                return "string" == typeof a && (a = this.parser.parse(a)), b && this.forEachStyleRule(a, b), this.parser.stringify(a, c)
            },
            forRulesInStyles: function(a, b) {
                if (a)
                    for (var c, d = 0, e = a.length; e > d && (c = a[d]); d++) this.forEachStyleRule(this.rulesForStyle(c), b)
            },
            rulesForStyle: function(a) {
                return !a.__cssRules && a.textContent && (a.__cssRules = this.parser.parse(a.textContent)), a.__cssRules
            },
            forEachStyleRule: function(a, b) {
                if (a) {
                    var c = !1;
                    a.type === this.ruleTypes.STYLE_RULE ? b(a) : a.type !== this.ruleTypes.KEYFRAMES_RULE && a.type !== this.ruleTypes.MIXIN_RULE || (c = !0);
                    var d = a.rules;
                    if (d && !c)
                        for (var e, f = 0, g = d.length; g > f && (e = d[f]); f++) this.forEachStyleRule(e, b)
                }
            },
            applyCss: function(a, b, c, d) {
                var e = document.createElement("style");
                if (b && e.setAttribute("scope", b), e.textContent = a, c = c || document.head, !d) {
                    var f = c.querySelectorAll("style[scope]");
                    d = f[f.length - 1]
                }
                return c.insertBefore(e, d && d.nextSibling || c.firstChild), e
            },
            cssFromModules: function(a, b) {
                for (var c = a.trim().split(" "), d = "", e = 0; e < c.length; e++) d += this.cssFromModule(c[e], b);
                return d
            },
            cssFromModule: function(a, b) {
                var c = Polymer.DomModule["import"](a);
                return c && !c._cssText && (c._cssText = this.cssFromElement(c)), !c && b && console.warn("Could not find style data in module named", a), c && c._cssText || ""
            },
            cssFromElement: function(a) {
                for (var b, c = "", d = a.content || a, e = Polymer.TreeApi.arrayCopy(d.querySelectorAll(this.MODULE_STYLES_SELECTOR)), f = 0; f < e.length; f++)
                    if (b = e[f], "template" === b.localName) c += this.cssFromElement(b);
                    else if ("style" === b.localName) {
                    var g = b.getAttribute(this.INCLUDE_ATTR);
                    g && (c += this.cssFromModules(g, !0)), b = b.__appliedElement || b, b.parentNode.removeChild(b), c += this.resolveCss(b.textContent, a.ownerDocument)
                } else b["import"] && b["import"].body && (c += this.resolveCss(b["import"].body.textContent, b["import"]));
                return c
            },
            resolveCss: Polymer.ResolveUrl.resolveCss,
            parser: Polymer.CssParse,
            ruleTypes: Polymer.CssParse.types
        }
    }(), Polymer.StyleTransformer = function() {
        var a = Polymer.Settings.useNativeShadow,
            b = Polymer.StyleUtil,
            c = {
                dom: function(a, b, c, d) {
                    this._transformDom(a, b || "", c, d)
                },
                _transformDom: function(a, b, c, d) {
                    a.setAttribute && this.element(a, b, c, d);
                    for (var e = Polymer.dom(a).childNodes, f = 0; f < e.length; f++) this._transformDom(e[f], b, c, d)
                },
                element: function(a, b, c, e) {
                    if (c) e ? a.removeAttribute(d) : a.setAttribute(d, b);
                    else if (b)
                        if (a.classList) e ? (a.classList.remove(d), a.classList.remove(b)) : (a.classList.add(d), a.classList.add(b));
                        else if (a.getAttribute) {
                        var f = a.getAttribute(s);
                        e ? f && a.setAttribute(s, f.replace(d, "").replace(b, "")) : a.setAttribute(s, (f ? f + " " : "") + d + " " + b)
                    }
                },
                elementStyles: function(c, d) {
                    for (var e, f = c._styles, g = "", h = 0, i = f.length; i > h && (e = f[h]); h++) {
                        var j = b.rulesForStyle(e);
                        g += a ? b.toCssText(j, d) : this.css(j, c.is, c["extends"], d, c._scopeCssViaAttr) + "\n\n"
                    }
                    return g.trim()
                },
                css: function(a, c, d, e, f) {
                    var g = this._calcHostScope(c, d);
                    c = this._calcElementScope(c, f);
                    var h = this;
                    return b.toCssText(a, function(a) {
                        a.isScoped || (h.rule(a, c, g), a.isScoped = !0), e && e(a, c, g)
                    })
                },
                _calcElementScope: function(a, b) {
                    return a ? b ? p + a + q : o + a : ""
                },
                _calcHostScope: function(a, b) {
                    return b ? "[is=" + a + "]" : a
                },
                rule: function(a, b, c) {
                    this._transformRule(a, this._transformComplexSelector, b, c)
                },
                _transformRule: function(a, b, c, d) {
                    for (var e, g = a.selector.split(f), h = 0, i = g.length; i > h && (e = g[h]); h++) g[h] = b.call(this, e, c, d);
                    a.selector = a.transformedSelector = g.join(f)
                },
                _transformComplexSelector: function(a, b, c) {
                    var d = !1,
                        e = !1,
                        h = this;
                    return a = a.replace(g, function(a, f, g) {
                        if (d) g = g.replace(n, " ");
                        else {
                            var i = h._transformCompoundSelector(g, f, b, c);
                            d = d || i.stop, e = e || i.hostContext, f = i.combinator, g = i.value
                        }
                        return f + g
                    }), e && (a = a.replace(l, function(a, b, d, e) {
                        return b + d + " " + c + e + f + " " + b + c + d + e
                    })), a
                },
                _transformCompoundSelector: function(a, b, c, d) {
                    var e = a.search(n),
                        f = !1;
                    a.indexOf(k) >= 0 ? f = !0 : a.indexOf(h) >= 0 ? (a = a.replace(j, function(a, b, c) {
                        return d + c
                    }), a = a.replace(h, d)) : 0 !== e && (a = c ? this._transformSimpleSelector(a, c) : a), a.indexOf(m) >= 0 && (b = "");
                    var g;
                    return e >= 0 && (a = a.replace(n, " "), g = !0), {
                        value: a,
                        combinator: b,
                        stop: g,
                        hostContext: f
                    }
                },
                _transformSimpleSelector: function(a, b) {
                    var c = a.split(r);
                    return c[0] += b, c.join(r)
                },
                documentRule: function(b) {
                    b.selector = b.parsedSelector, this.normalizeRootSelector(b), a || this._transformRule(b, this._transformDocumentSelector)
                },
                normalizeRootSelector: function(a) {
                    a.selector === i && (a.selector = "body")
                },
                _transformDocumentSelector: function(a) {
                    return a.match(n) ? this._transformComplexSelector(a, e) : this._transformSimpleSelector(a.trim(), e)
                },
                SCOPE_NAME: "style-scope"
            },
            d = c.SCOPE_NAME,
            e = ":not([" + d + "]):not(." + d + ")",
            f = ",",
            g = /(^|[\s>+~]+)([^\s>+~]+)/g,
            h = ":host",
            i = ":root",
            j = /(\:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/g,
            k = ":host-context",
            l = /(.*)(?::host-context)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))(.*)/,
            m = "::content",
            n = /::content|::shadow|\/deep\//,
            o = ".",
            p = "[" + d + "~=",
            q = "]",
            r = ":",
            s = "class";
        return c
    }(), Polymer.StyleExtends = function() {
        var a = Polymer.StyleUtil;
        return {
            hasExtends: function(a) {
                return Boolean(a.match(this.rx.EXTEND))
            },
            transform: function(b) {
                var c = a.rulesForStyle(b),
                    d = this;
                return a.forEachStyleRule(c, function(a) {
                    d._mapRule(a);
                    if (a.parent)
                        for (var b; b = d.rx.EXTEND.exec(a.cssText);) {
                            var c = b[1],
                                e = d._findExtendor(c, a);
                            e && d._extendRule(a, e)
                        }
                    a.cssText = a.cssText.replace(d.rx.EXTEND, "")
                }), a.toCssText(c, function(a) {
                    a.selector.match(d.rx.STRIP) && (a.cssText = "")
                }, !0)
            },
            _mapRule: function(a) {
                if (a.parent) {
                    for (var b, c = a.parent.map || (a.parent.map = {}), d = a.selector.split(","), e = 0; e < d.length; e++) b = d[e], c[b.trim()] = a;
                    return c
                }
            },
            _findExtendor: function(a, b) {
                return b.parent && b.parent.map && b.parent.map[a] || this._findExtendor(a, b.parent)
            },
            _extendRule: function(a, b) {
                a.parent !== b.parent && this._cloneAndAddRuleToParent(b, a.parent), a["extends"] = a["extends"] || [], a["extends"].push(b), b.selector = b.selector.replace(this.rx.STRIP, ""), b.selector = (b.selector && b.selector + ",\n") + a.selector, b["extends"] && b["extends"].forEach(function(b) {
                    this._extendRule(a, b)
                }, this)
            },
            _cloneAndAddRuleToParent: function(a, b) {
                a = Object.create(a), a.parent = b, a["extends"] && (a["extends"] = a["extends"].slice()), b.rules.push(a)
            },
            rx: {
                EXTEND: /@extends\(([^)]*)\)\s*?;/gim,
                STRIP: /%[^,]*$/
            }
        }
    }(),
    function() {
        var a = Polymer.Base._prepElement,
            b = Polymer.Settings.useNativeShadow,
            c = Polymer.StyleUtil,
            d = Polymer.StyleTransformer,
            e = Polymer.StyleExtends;
        Polymer.Base._addFeature({
            _prepElement: function(b) {
                this._encapsulateStyle && d.element(b, this.is, this._scopeCssViaAttr), a.call(this, b)
            },
            _prepStyles: function() {
                if (void 0 === this._encapsulateStyle && (this._encapsulateStyle = !b && Boolean(this._template)), this._template) {
                    this._styles = this._collectStyles();
                    var a = d.elementStyles(this);
                    if (a) {
                        var e = c.applyCss(a, this.is, b ? this._template.content : null);
                        b || (this._scopeStyle = e)
                    }
                } else this._styles = []
            },
            _collectStyles: function() {
                var a = [],
                    b = "",
                    d = this.styleModules;
                if (d)
                    for (var f, g = 0, h = d.length; h > g && (f = d[g]); g++) b += c.cssFromModule(f);
                b += c.cssFromModule(this.is);
                var i = this._template && this._template.parentNode;
                if (!this._template || i && i.id.toLowerCase() === this.is || (b += c.cssFromElement(this._template)), b) {
                    var j = document.createElement("style");
                    j.textContent = b, e.hasExtends(j.textContent) && (b = e.transform(j)), a.push(j)
                }
                return a
            },
            _elementAdd: function(a) {
                this._encapsulateStyle && (a.__styleScoped ? a.__styleScoped = !1 : d.dom(a, this.is, this._scopeCssViaAttr))
            },
            _elementRemove: function(a) {
                this._encapsulateStyle && d.dom(a, this.is, this._scopeCssViaAttr, !0)
            },
            scopeSubtree: function(a, c) {
                if (!b) {
                    var d = this,
                        e = function(a) {
                            if (a.nodeType === Node.ELEMENT_NODE) {
                                var b = a.getAttribute("class");
                                a.setAttribute("class", d._scopeElementClass(a, b));
                                for (var c, e = a.querySelectorAll("*"), f = 0; f < e.length && (c = e[f]); f++) b = c.getAttribute("class"), c.setAttribute("class", d._scopeElementClass(c, b))
                            }
                        };
                    if (e(a), c) {
                        var f = new MutationObserver(function(a) {
                            for (var b, c = 0; c < a.length && (b = a[c]); c++)
                                if (b.addedNodes)
                                    for (var d = 0; d < b.addedNodes.length; d++) e(b.addedNodes[d])
                        });
                        return f.observe(a, {
                            childList: !0,
                            subtree: !0
                        }), f
                    }
                }
            }
        })
    }(), Polymer.StyleProperties = function() {
        "use strict";

        function a(a, b) {
            var c = parseInt(a / 32),
                d = 1 << a % 32;
            b[c] = (b[c] || 0) | d
        }
        var b = Polymer.Settings.useNativeShadow,
            c = Polymer.DomApi.matchesSelector,
            d = Polymer.StyleUtil,
            e = Polymer.StyleTransformer;
        return {
            decorateStyles: function(a) {
                var b = this,
                    c = {};
                d.forRulesInStyles(a, function(a) {
                    b.decorateRule(a), b.collectPropertiesInCssText(a.propertyInfo.cssText, c)
                });
                var e = [];
                for (var f in c) e.push(f);
                return e
            },
            decorateRule: function(a) {
                if (a.propertyInfo) return a.propertyInfo;
                var b = {},
                    c = {},
                    d = this.collectProperties(a, c);
                return d && (b.properties = c, a.rules = null), b.cssText = this.collectCssText(a), a.propertyInfo = b, b
            },
            collectProperties: function(a, b) {
                var c = a.propertyInfo;
                if (!c) {
                    for (var d, e, f = this.rx.VAR_ASSIGN, g = a.parsedCssText; d = f.exec(g);) b[d[1]] = (d[2] || d[3]).trim(), e = !0;
                    return e
                }
                return c.properties ? (Polymer.Base.mixin(b, c.properties), !0) : void 0
            },
            collectCssText: function(a) {
                var b = "",
                    c = a.parsedCssText;
                c = c.replace(this.rx.BRACKETED, "").replace(this.rx.VAR_ASSIGN, "");
                for (var d, e = c.split(";"), f = 0; f < e.length; f++) d = e[f], (d.match(this.rx.MIXIN_MATCH) || d.match(this.rx.VAR_MATCH)) && (b += d + ";\n");
                return b
            },
            collectPropertiesInCssText: function(a, b) {
                for (var c; c = this.rx.VAR_CAPTURE.exec(a);) {
                    b[c[1]] = !0;
                    var d = c[2];
                    d && d.match(this.rx.IS_VAR) && (b[d] = !0)
                }
            },
            reify: function(a) {
                for (var b, c = Object.getOwnPropertyNames(a), d = 0; d < c.length; d++) b = c[d], a[b] = this.valueForProperty(a[b], a)
            },
            valueForProperty: function(a, b) {
                if (a)
                    if (a.indexOf(";") >= 0) a = this.valueForProperties(a, b);
                    else {
                        var c = this,
                            d = function(a, d, e, f) {
                                var g = c.valueForProperty(b[e], b) || (b[f] ? c.valueForProperty(b[f], b) : f);
                                return d + (g || "")
                            };
                        a = a.replace(this.rx.VAR_MATCH, d)
                    }
                return a && a.trim() || ""
            },
            valueForProperties: function(a, b) {
                for (var c, d, e = a.split(";"), f = 0; f < e.length; f++)
                    if (c = e[f]) {
                        if (d = c.match(this.rx.MIXIN_MATCH)) c = this.valueForProperty(b[d[1]], b);
                        else {
                            var g = c.split(":");
                            g[1] && (g[1] = g[1].trim(), g[1] = this.valueForProperty(g[1], b) || g[1]), c = g.join(":")
                        }
                        e[f] = c && c.lastIndexOf(";") === c.length - 1 ? c.slice(0, -1) : c || ""
                    }
                return e.join(";")
            },
            applyProperties: function(a, b) {
                var c = "";
                a.propertyInfo || this.decorateRule(a), a.propertyInfo.cssText && (c = this.valueForProperties(a.propertyInfo.cssText, b)), a.cssText = c
            },
            propertyDataFromStyles: function(b, e) {
                var f = {},
                    g = this,
                    h = [],
                    i = 0;
                return d.forRulesInStyles(b, function(b) {
                    b.propertyInfo || g.decorateRule(b), e && b.propertyInfo.properties && c.call(e, b.transformedSelector || b.parsedSelector) && (g.collectProperties(b, f), a(i, h)), i++
                }), {
                    properties: f,
                    key: h
                }
            },
            scopePropertiesFromStyles: function(a) {
                return a._scopeStyleProperties || (a._scopeStyleProperties = this.selectedPropertiesFromStyles(a, this.SCOPE_SELECTORS)), a._scopeStyleProperties
            },
            hostPropertiesFromStyles: function(a) {
                return a._hostStyleProperties || (a._hostStyleProperties = this.selectedPropertiesFromStyles(a, this.HOST_SELECTORS)), a._hostStyleProperties
            },
            selectedPropertiesFromStyles: function(a, b) {
                var c = {},
                    e = this;
                return d.forRulesInStyles(a, function(a) {
                    a.propertyInfo || e.decorateRule(a);
                    for (var d = 0; d < b.length; d++)
                        if (a.parsedSelector === b[d]) return void e.collectProperties(a, c)
                }), c
            },
            transformStyles: function(a, c, d) {
                var f = this,
                    g = e._calcHostScope(a.is, a["extends"]),
                    h = a["extends"] ? "\\" + g.slice(0, -1) + "\\]" : g,
                    i = new RegExp(this.rx.HOST_PREFIX + h + this.rx.HOST_SUFFIX);
                return e.elementStyles(a, function(e) {
                    f.applyProperties(e, c), e.cssText && !b && f._scopeSelector(e, i, g, a._scopeCssViaAttr, d)
                })
            },
            _scopeSelector: function(a, b, c, d, f) {
                a.transformedSelector = a.transformedSelector || a.selector;
                for (var g, h = a.transformedSelector, i = d ? "[" + e.SCOPE_NAME + "~=" + f + "]" : "." + f, j = h.split(","), k = 0, l = j.length; l > k && (g = j[k]); k++) j[k] = g.match(b) ? g.replace(c, c + i) : i + " " + g;
                a.selector = j.join(",")
            },
            applyElementScopeSelector: function(a, b, c, d) {
                var f = d ? a.getAttribute(e.SCOPE_NAME) : a.getAttribute("class") || "",
                    g = c ? f.replace(c, b) : (f ? f + " " : "") + this.XSCOPE_NAME + " " + b;
                f !== g && (d ? a.setAttribute(e.SCOPE_NAME, g) : a.setAttribute("class", g))
            },
            applyElementStyle: function(a, c, e, f) {
                var g = f ? f.textContent || "" : this.transformStyles(a, c, e),
                    h = a._customStyle;
                return h && !b && h !== f && (h._useCount--, h._useCount <= 0 && h.parentNode && h.parentNode.removeChild(h)), !b && f && f.parentNode || (b && a._customStyle ? (a._customStyle.textContent = g, f = a._customStyle) : g && (f = d.applyCss(g, e, b ? a.root : null, a._scopeStyle))), f && (f._useCount = f._useCount || 0, a._customStyle != f && f._useCount++, a._customStyle = f), f
            },
            mixinCustomStyle: function(a, b) {
                var c;
                for (var d in b) c = b[d], (c || 0 === c) && (a[d] = c)
            },
            rx: {
                VAR_ASSIGN: /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:([^;{]*)|{([^}]*)})(?:(?=[;\s}])|$)/gi,
                MIXIN_MATCH: /(?:^|\W+)@apply[\s]*\(([^)]*)\)/i,
                VAR_MATCH: /(^|\W+)var\([\s]*([^,)]*)[\s]*,?[\s]*((?:[^,)]*)|(?:[^;]*\([^;)]*\)))[\s]*?\)/gi,
                VAR_CAPTURE: /\([\s]*(--[^,\s)]*)(?:,[\s]*(--[^,\s)]*))?(?:\)|,)/gi,
                IS_VAR: /^--/,
                BRACKETED: /\{[^}]*\}/g,
                HOST_PREFIX: "(?:^|[^.#[:])",
                HOST_SUFFIX: "($|[.:[\\s>+~])"
            },
            HOST_SELECTORS: [":host"],
            SCOPE_SELECTORS: [":root"],
            XSCOPE_NAME: "x-scope"
        }
    }(),
    function() {
        Polymer.StyleCache = function() {
            this.cache = {}
        }, Polymer.StyleCache.prototype = {
            MAX: 100,
            store: function(a, b, c, d) {
                b.keyValues = c, b.styles = d;
                var e = this.cache[a] = this.cache[a] || [];
                e.push(b), e.length > this.MAX && e.shift()
            },
            retrieve: function(a, b, c) {
                var d = this.cache[a];
                if (d)
                    for (var e, f = d.length - 1; f >= 0; f--)
                        if (e = d[f], c === e.styles && this._objectsEqual(b, e.keyValues)) return e
            },
            clear: function() {
                this.cache = {}
            },
            _objectsEqual: function(a, b) {
                var c, d;
                for (var e in a)
                    if (c = a[e], d = b[e], !("object" == typeof c && c ? this._objectsStrictlyEqual(c, d) : c === d)) return !1;
                return Array.isArray(a) ? a.length === b.length : !0
            },
            _objectsStrictlyEqual: function(a, b) {
                return this._objectsEqual(a, b) && this._objectsEqual(b, a)
            }
        }
    }(), Polymer.StyleDefaults = function() {
        var a = Polymer.StyleProperties,
            b = (Polymer.StyleUtil, Polymer.StyleCache),
            c = {
                _styles: [],
                _properties: null,
                customStyle: {},
                _styleCache: new b,
                addStyle: function(a) {
                    this._styles.push(a), this._properties = null
                },
                get _styleProperties() {
                    return this._properties || (a.decorateStyles(this._styles), this._styles._scopeStyleProperties = null, this._properties = a.scopePropertiesFromStyles(this._styles), a.mixinCustomStyle(this._properties, this.customStyle), a.reify(this._properties)), this._properties
                },
                _needsStyleProperties: function() {},
                _computeStyleProperties: function() {
                    return this._styleProperties
                },
                updateStyles: function(a) {
                    this._properties = null, a && Polymer.Base.mixin(this.customStyle, a), this._styleCache.clear();
                    for (var b, c = 0; c < this._styles.length; c++) b = this._styles[c], b = b.__importElement || b, b._apply()
                }
            };
        return c
    }(),
    function() {
        "use strict";
        var a = Polymer.Base.serializeValueToAttribute,
            b = Polymer.StyleProperties,
            c = Polymer.StyleTransformer,
            d = (Polymer.StyleUtil, Polymer.StyleDefaults),
            e = Polymer.Settings.useNativeShadow;
        Polymer.Base._addFeature({
            _prepStyleProperties: function() {
                this._ownStylePropertyNames = this._styles ? b.decorateStyles(this._styles) : null
            },
            customStyle: null,
            getComputedStyleValue: function(a) {
                return this._styleProperties && this._styleProperties[a] || getComputedStyle(this).getPropertyValue(a)
            },
            _setupStyleProperties: function() {
                this.customStyle = {}, this._styleCache = null, this._styleProperties = null, this._scopeSelector = null, this._ownStyleProperties = null, this._customStyle = null
            },
            _needsStyleProperties: function() {
                return Boolean(this._ownStylePropertyNames && this._ownStylePropertyNames.length)
            },
            _beforeAttached: function() {
                !this._scopeSelector && this._needsStyleProperties() && this._updateStyleProperties()
            },
            _findStyleHost: function() {
                for (var a, b = this; a = Polymer.dom(b).getOwnerRoot();) {
                    if (Polymer.isInstance(a.host)) return a.host;
                    b = a.host
                }
                return d
            },
            _updateStyleProperties: function() {
                var a, c = this._findStyleHost();
                c._styleCache || (c._styleCache = new Polymer.StyleCache);
                var d = b.propertyDataFromStyles(c._styles, this);
                d.key.customStyle = this.customStyle, a = c._styleCache.retrieve(this.is, d.key, this._styles);
                var g = Boolean(a);
                g ? this._styleProperties = a._styleProperties : this._computeStyleProperties(d.properties), this._computeOwnStyleProperties(), g || (a = f.retrieve(this.is, this._ownStyleProperties, this._styles));
                var h = Boolean(a) && !g,
                    i = this._applyStyleProperties(a);
                g || (i = i && e ? i.cloneNode(!0) : i, a = {
                    style: i,
                    _scopeSelector: this._scopeSelector,
                    _styleProperties: this._styleProperties
                }, d.key.customStyle = {}, this.mixin(d.key.customStyle, this.customStyle), c._styleCache.store(this.is, a, d.key, this._styles), h || f.store(this.is, Object.create(a), this._ownStyleProperties, this._styles))
            },
            _computeStyleProperties: function(a) {
                var c = this._findStyleHost();
                c._styleProperties || c._computeStyleProperties();
                var d = Object.create(c._styleProperties);
                this.mixin(d, b.hostPropertiesFromStyles(this._styles)), a = a || b.propertyDataFromStyles(c._styles, this).properties, this.mixin(d, a), this.mixin(d, b.scopePropertiesFromStyles(this._styles)), b.mixinCustomStyle(d, this.customStyle), b.reify(d), this._styleProperties = d
            },
            _computeOwnStyleProperties: function() {
                for (var a, b = {}, c = 0; c < this._ownStylePropertyNames.length; c++) a = this._ownStylePropertyNames[c], b[a] = this._styleProperties[a];
                this._ownStyleProperties = b
            },
            _scopeCount: 0,
            _applyStyleProperties: function(a) {
                var c = this._scopeSelector;
                this._scopeSelector = a ? a._scopeSelector : this.is + "-" + this.__proto__._scopeCount++;
                var d = b.applyElementStyle(this, this._styleProperties, this._scopeSelector, a && a.style);
                return e || b.applyElementScopeSelector(this, this._scopeSelector, c, this._scopeCssViaAttr), d
            },
            serializeValueToAttribute: function(b, c, d) {
                if (d = d || this, "class" === c && !e) {
                    var f = d === this ? this.domHost || this.dataHost : this;
                    f && (b = f._scopeElementClass(d, b))
                }
                d = this.shadyRoot && this.shadyRoot._hasDistributed ? Polymer.dom(d) : d, a.call(this, b, c, d)
            },
            _scopeElementClass: function(a, b) {
                return e || this._scopeCssViaAttr || (b += (b ? " " : "") + g + " " + this.is + (a._scopeSelector ? " " + h + " " + a._scopeSelector : "")), b
            },
            updateStyles: function(a) {
                this.isAttached && (a && this.mixin(this.customStyle, a), this._needsStyleProperties() ? this._updateStyleProperties() : this._styleProperties = null, this._styleCache && this._styleCache.clear(), this._updateRootStyles())
            },
            _updateRootStyles: function(a) {
                a = a || this.root;
                for (var b, c = Polymer.dom(a)._query(function(a) {
                        return a.shadyRoot || a.shadowRoot
                    }), d = 0, e = c.length; e > d && (b = c[d]); d++) b.updateStyles && b.updateStyles()
            }
        }), Polymer.updateStyles = function(a) {
            d.updateStyles(a), Polymer.Base._updateRootStyles(document)
        };
        var f = new Polymer.StyleCache;
        Polymer.customStyleCache = f;
        var g = c.SCOPE_NAME,
            h = b.XSCOPE_NAME
    }(), Polymer.Base._addFeature({
        _registerFeatures: function() {
            this._prepIs(), this._prepConstructor(), this._prepTemplate(), this._prepStyles(), this._prepStyleProperties(), this._prepAnnotations(), this._prepEffects(), this._prepBehaviors(), this._prepPropertyInfo(), this._prepBindings(), this._prepShady()
        },
        _prepBehavior: function(a) {
            this._addPropertyEffects(a.properties), this._addComplexObserverEffects(a.observers), this._addHostAttributes(a.hostAttributes)
        },
        _initFeatures: function() {
            this._setupGestures(), this._setupConfigure(), this._setupStyleProperties(), this._setupDebouncers(), this._setupShady(), this._registerHost(), this._template && (this._poolContent(), this._beginHosting(), this._stampTemplate(), this._endHosting(), this._marshalAnnotationReferences()), this._marshalInstanceEffects(), this._marshalBehaviors(), this._marshalHostAttributes(), this._marshalAttributes(), this._tryReady()
        },
        _marshalBehavior: function(a) {
            a.listeners && this._listenListeners(a.listeners)
        }
    }),
    function() {
        var a = (Polymer.Settings.useNativeShadow, Polymer.StyleProperties),
            b = Polymer.StyleUtil,
            c = Polymer.CssParse,
            d = Polymer.StyleDefaults,
            e = Polymer.StyleTransformer;
        Polymer({
            is: "custom-style",
            "extends": "style",
            _template: null,
            properties: {
                include: String
            },
            ready: function() {
                this._tryApply()
            },
            attached: function() {
                this._tryApply()
            },
            _tryApply: function() {
                if (!this._appliesToDocument && this.parentNode && "dom-module" !== this.parentNode.localName) {
                    this._appliesToDocument = !0;
                    var a = this.__appliedElement || this;
                    if (d.addStyle(a), a.textContent || this.include) this._apply(!0);
                    else {
                        var b = this,
                            c = new MutationObserver(function() {
                                c.disconnect(), b._apply(!0)
                            });
                        c.observe(a, {
                            childList: !0
                        })
                    }
                }
            },
            _apply: function(a) {
                var c = this.__appliedElement || this;
                if (this.include && (c.textContent = b.cssFromModules(this.include, !0) + c.textContent), c.textContent) {
                    b.forEachStyleRule(b.rulesForStyle(c), function(a) {
                        e.documentRule(a)
                    });
                    var d = this,
                        f = function() {
                            d._applyCustomProperties(c)
                        };
                    this._pendingApplyProperties && (cancelAnimationFrame(this._pendingApplyProperties), this._pendingApplyProperties = null), a ? this._pendingApplyProperties = requestAnimationFrame(f) : f()
                }
            },
            _applyCustomProperties: function(d) {
                this._computeStyleProperties();
                var e = this._styleProperties,
                    f = b.rulesForStyle(d);
                d.textContent = b.toCssText(f, function(b) {
                    var d = b.cssText = b.parsedCssText;
                    b.propertyInfo && b.propertyInfo.cssText && (d = c.removeCustomPropAssignment(d), b.cssText = a.valueForProperties(d, e))
                })
            }
        })
    }(), Polymer.Templatizer = {
        properties: {
            __hideTemplateChildren__: {
                observer: "_showHideChildren"
            }
        },
        _instanceProps: Polymer.nob,
        _parentPropPrefix: "_parent_",
        templatize: function(a) {
            if (this._templatized = a, a._content || (a._content = a.content), a._content._ctor) return this.ctor = a._content._ctor, void this._prepParentProperties(this.ctor.prototype, a);
            var b = Object.create(Polymer.Base);
            this._customPrepAnnotations(b, a), this._prepParentProperties(b, a), b._prepEffects(), this._customPrepEffects(b), b._prepBehaviors(), b._prepPropertyInfo(), b._prepBindings(), b._notifyPathUp = this._notifyPathUpImpl, b._scopeElementClass = this._scopeElementClassImpl, b.listen = this._listenImpl, b._showHideChildren = this._showHideChildrenImpl, b.__setPropertyOrig = this.__setProperty, b.__setProperty = this.__setPropertyImpl;
            var c = this._constructorImpl,
                d = function(a, b) {
                    c.call(this, a, b)
                };
            d.prototype = b, b.constructor = d, a._content._ctor = d, this.ctor = d
        },
        _getRootDataHost: function() {
            return this.dataHost && this.dataHost._rootDataHost || this.dataHost
        },
        _showHideChildrenImpl: function(a) {
            for (var b = this._children, c = 0; c < b.length; c++) {
                var d = b[c];
                Boolean(a) != Boolean(d.__hideTemplateChildren__) && (d.nodeType === Node.TEXT_NODE ? a ? (d.__polymerTextContent__ = d.textContent, d.textContent = "") : d.textContent = d.__polymerTextContent__ : d.style && (a ? (d.__polymerDisplay__ = d.style.display, d.style.display = "none") : d.style.display = d.__polymerDisplay__)), d.__hideTemplateChildren__ = a
            }
        },
        __setPropertyImpl: function(a, b, c, d) {
            d && d.__hideTemplateChildren__ && "textContent" == a && (a = "__polymerTextContent__"), this.__setPropertyOrig(a, b, c, d)
        },
        _debounceTemplate: function(a) {
            Polymer.dom.addDebouncer(this.debounce("_debounceTemplate", a))
        },
        _flushTemplates: function(a) {
            Polymer.dom.flush()
        },
        _customPrepEffects: function(a) {
            var b = a._parentProps;
            for (var c in b) a._addPropertyEffect(c, "function", this._createHostPropEffector(c));
            for (var c in this._instanceProps) a._addPropertyEffect(c, "function", this._createInstancePropEffector(c))
        },
        _customPrepAnnotations: function(a, b) {
            a._template = b;
            var c = b._content;
            if (!c._notes) {
                var d = a._rootDataHost;
                d && (Polymer.Annotations.prepElement = function() {
                    d._prepElement()
                }), c._notes = Polymer.Annotations.parseAnnotations(b), Polymer.Annotations.prepElement = null, this._processAnnotations(c._notes)
            }
            a._notes = c._notes, a._parentProps = c._parentProps
        },
        _prepParentProperties: function(a, b) {
            var c = this._parentProps = a._parentProps;
            if (this._forwardParentProp && c) {
                var d, e = a._parentPropProto;
                if (!e) {
                    for (d in this._instanceProps) delete c[d];
                    e = a._parentPropProto = Object.create(null), b != this && (Polymer.Bind.prepareModel(e), Polymer.Base.prepareModelNotifyPath(e));
                    for (d in c) {
                        var f = this._parentPropPrefix + d,
                            g = [{
                                kind: "function",
                                effect: this._createForwardPropEffector(d),
                                fn: Polymer.Bind._functionEffect
                            }, {
                                kind: "notify",
                                fn: Polymer.Bind._notifyEffect,
                                effect: {
                                    event: Polymer.CaseMap.camelToDashCase(f) + "-changed"
                                }
                            }];
                        Polymer.Bind._createAccessors(e, f, g)
                    }
                }
                var h = this;
                b != this && (Polymer.Bind.prepareInstance(b), b._forwardParentProp = function(a, b) {
                    h._forwardParentProp(a, b)
                }), this._extendTemplate(b, e), b._pathEffector = function(a, b, c) {
                    return h._pathEffectorImpl(a, b, c)
                }
            }
        },
        _createForwardPropEffector: function(a) {
            return function(b, c) {
                this._forwardParentProp(a, c)
            }
        },
        _createHostPropEffector: function(a) {
            var b = this._parentPropPrefix;
            return function(c, d) {
                this.dataHost._templatized[b + a] = d
            }
        },
        _createInstancePropEffector: function(a) {
            return function(b, c, d, e) {
                e || this.dataHost._forwardInstanceProp(this, a, c)
            }
        },
        _extendTemplate: function(a, b) {
            for (var c, d = Object.getOwnPropertyNames(b), e = 0; e < d.length && (c = d[e]); e++) {
                var f = a[c],
                    g = Object.getOwnPropertyDescriptor(b, c);
                Object.defineProperty(a, c, g), void 0 !== f && a._propertySetter(c, f)
            }
        },
        _showHideChildren: function(a) {},
        _forwardInstancePath: function(a, b, c) {},
        _forwardInstanceProp: function(a, b, c) {},
        _notifyPathUpImpl: function(a, b) {
            var c = this.dataHost,
                d = a.indexOf("."),
                e = 0 > d ? a : a.slice(0, d);
            c._forwardInstancePath.call(c, this, a, b), e in c._parentProps && c._templatized.notifyPath(c._parentPropPrefix + a, b)
        },
        _pathEffectorImpl: function(a, b, c) {
            if (this._forwardParentPath && 0 === a.indexOf(this._parentPropPrefix)) {
                var d = a.substring(this._parentPropPrefix.length),
                    e = this._modelForPath(d);
                e in this._parentProps && this._forwardParentPath(d, b)
            }
            Polymer.Base._pathEffector.call(this._templatized, a, b, c)
        },
        _constructorImpl: function(a, b) {
            this._rootDataHost = b._getRootDataHost(), this._setupConfigure(a), this._registerHost(b), this._beginHosting(), this.root = this.instanceTemplate(this._template), this.root.__noContent = !this._notes._hasContent, this.root.__styleScoped = !0, this._endHosting(), this._marshalAnnotatedNodes(), this._marshalInstanceEffects(), this._marshalAnnotatedListeners();
            for (var c = [], d = this.root.firstChild; d; d = d.nextSibling) c.push(d), d._templateInstance = this;
            this._children = c, b.__hideTemplateChildren__ && this._showHideChildren(!0), this._tryReady()
        },
        _listenImpl: function(a, b, c) {
            var d = this,
                e = this._rootDataHost,
                f = e._createEventHandler(a, b, c),
                g = function(a) {
                    a.model = d, f(a)
                };
            e._listen(a, b, g)
        },
        _scopeElementClassImpl: function(a, b) {
            var c = this._rootDataHost;
            return c ? c._scopeElementClass(a, b) : void 0
        },
        stamp: function(a) {
            if (a = a || {}, this._parentProps) {
                var b = this._templatized;
                for (var c in this._parentProps) a[c] = b[this._parentPropPrefix + c]
            }
            return new this.ctor(a, this)
        },
        modelForElement: function(a) {
            for (var b; a;)
                if (b = a._templateInstance) {
                    if (b.dataHost == this) return b;
                    a = b.dataHost
                } else a = a.parentNode
        }
    }, Polymer({
        is: "dom-template",
        "extends": "template",
        _template: null,
        behaviors: [Polymer.Templatizer],
        ready: function() {
            this.templatize(this)
        }
    }), Polymer._collections = new WeakMap, Polymer.Collection = function(a) {
        Polymer._collections.set(a, this), this.userArray = a, this.store = a.slice(), this.initMap()
    }, Polymer.Collection.prototype = {
        constructor: Polymer.Collection,
        initMap: function() {
            for (var a = this.omap = new WeakMap, b = this.pmap = {}, c = this.store, d = 0; d < c.length; d++) {
                var e = c[d];
                e && "object" == typeof e ? a.set(e, d) : b[e] = d
            }
        },
        add: function(a) {
            var b = this.store.push(a) - 1;
            return a && "object" == typeof a ? this.omap.set(a, b) : this.pmap[a] = b, "#" + b
        },
        removeKey: function(a) {
            (a = this._parseKey(a)) && (this._removeFromMap(this.store[a]), delete this.store[a])
        },
        _removeFromMap: function(a) {
            a && "object" == typeof a ? this.omap["delete"](a) : delete this.pmap[a]
        },
        remove: function(a) {
            var b = this.getKey(a);
            return this.removeKey(b), b
        },
        getKey: function(a) {
            var b;
            return b = a && "object" == typeof a ? this.omap.get(a) : this.pmap[a], void 0 != b ? "#" + b : void 0
        },
        getKeys: function() {
            return Object.keys(this.store).map(function(a) {
                return "#" + a
            })
        },
        _parseKey: function(a) {
            return a && "#" == a[0] ? a.slice(1) : void 0
        },
        setItem: function(a, b) {
            if (a = this._parseKey(a)) {
                var c = this.store[a];
                c && this._removeFromMap(c), b && "object" == typeof b ? this.omap.set(b, a) : this.pmap[b] = a, this.store[a] = b
            }
        },
        getItem: function(a) {
            return (a = this._parseKey(a)) ? this.store[a] : void 0
        },
        getItems: function() {
            var a = [],
                b = this.store;
            for (var c in b) a.push(b[c]);
            return a
        },
        _applySplices: function(a) {
            for (var b, c, d = {}, e = 0; e < a.length && (c = a[e]); e++) {
                c.addedKeys = [];
                for (var f = 0; f < c.removed.length; f++) b = this.getKey(c.removed[f]), d[b] = d[b] ? null : -1;
                for (var f = 0; f < c.addedCount; f++) {
                    var g = this.userArray[c.index + f];
                    b = this.getKey(g), b = void 0 === b ? this.add(g) : b, d[b] = d[b] ? null : 1, c.addedKeys.push(b)
                }
            }
            var h = [],
                i = [];
            for (var b in d) d[b] < 0 && (this.removeKey(b), h.push(b)), d[b] > 0 && i.push(b);
            return [{
                removed: h,
                added: i
            }]
        }
    }, Polymer.Collection.get = function(a) {
        return Polymer._collections.get(a) || new Polymer.Collection(a)
    }, Polymer.Collection.applySplices = function(a, b) {
        var c = Polymer._collections.get(a);
        return c ? c._applySplices(b) : null
    }, Polymer({
        is: "dom-repeat",
        "extends": "template",
        _template: null,
        properties: {
            items: {
                type: Array
            },
            as: {
                type: String,
                value: "item"
            },
            indexAs: {
                type: String,
                value: "index"
            },
            sort: {
                type: Function,
                observer: "_sortChanged"
            },
            filter: {
                type: Function,
                observer: "_filterChanged"
            },
            observe: {
                type: String,
                observer: "_observeChanged"
            },
            delay: Number,
            renderedItemCount: {
                type: Number,
                notify: !0,
                readOnly: !0
            },
            initialCount: {
                type: Number,
                observer: "_initializeChunking"
            },
            targetFramerate: {
                type: Number,
                value: 20
            },
            _targetFrameTime: {
                type: Number,
                computed: "_computeFrameTime(targetFramerate)"
            }
        },
        behaviors: [Polymer.Templatizer],
        observers: ["_itemsChanged(items.*)"],
        created: function() {
            this._instances = [], this._pool = [], this._limit = 1 / 0;
            var a = this;
            this._boundRenderChunk = function() {
                a._renderChunk()
            }
        },
        detached: function() {
            this.__isDetached = !0;
            for (var a = 0; a < this._instances.length; a++) this._detachInstance(a)
        },
        attached: function() {
            if (this.__isDetached) {
                this.__isDetached = !1;
                for (var a = Polymer.dom(Polymer.dom(this).parentNode), b = 0; b < this._instances.length; b++) this._attachInstance(b, a)
            }
        },
        ready: function() {
            this._instanceProps = {
                __key__: !0
            }, this._instanceProps[this.as] = !0, this._instanceProps[this.indexAs] = !0, this.ctor || this.templatize(this)
        },
        _sortChanged: function(a) {
            var b = this._getRootDataHost();
            this._sortFn = a && ("function" == typeof a ? a : function() {
                return b[a].apply(b, arguments)
            }), this._needFullRefresh = !0, this.items && this._debounceTemplate(this._render)
        },
        _filterChanged: function(a) {
            var b = this._getRootDataHost();
            this._filterFn = a && ("function" == typeof a ? a : function() {
                return b[a].apply(b, arguments)
            }), this._needFullRefresh = !0, this.items && this._debounceTemplate(this._render)
        },
        _computeFrameTime: function(a) {
            return Math.ceil(1e3 / a)
        },
        _initializeChunking: function() {
            this.initialCount && (this._limit = this.initialCount, this._chunkCount = this.initialCount, this._lastChunkTime = performance.now())
        },
        _tryRenderChunk: function() {
            this.items && this._limit < this.items.length && this.debounce("renderChunk", this._requestRenderChunk)
        },
        _requestRenderChunk: function() {
            requestAnimationFrame(this._boundRenderChunk)
        },
        _renderChunk: function() {
            var a = performance.now(),
                b = this._targetFrameTime / (a - this._lastChunkTime);
            this._chunkCount = Math.round(this._chunkCount * b) || 1, this._limit += this._chunkCount, this._lastChunkTime = a, this._debounceTemplate(this._render)
        },
        _observeChanged: function() {
            this._observePaths = this.observe && this.observe.replace(".*", ".").split(" ")
        },
        _itemsChanged: function(a) {
            if ("items" == a.path) Array.isArray(this.items) ? this.collection = Polymer.Collection.get(this.items) : this.items ? this._error(this._logf("dom-repeat", "expected array for `items`, found", this.items)) : this.collection = null, this._keySplices = [], this._indexSplices = [], this._needFullRefresh = !0, this._initializeChunking(), this._debounceTemplate(this._render);
            else if ("items.splices" == a.path) this._keySplices = this._keySplices.concat(a.value.keySplices), this._indexSplices = this._indexSplices.concat(a.value.indexSplices), this._debounceTemplate(this._render);
            else {
                var b = a.path.slice(6);
                this._forwardItemPath(b, a.value), this._checkObservedPaths(b)
            }
        },
        _checkObservedPaths: function(a) {
            if (this._observePaths) {
                a = a.substring(a.indexOf(".") + 1);
                for (var b = this._observePaths, c = 0; c < b.length; c++)
                    if (0 === a.indexOf(b[c])) return this._needFullRefresh = !0, void(this.delay ? this.debounce("render", this._render, this.delay) : this._debounceTemplate(this._render))
            }
        },
        render: function() {
            this._needFullRefresh = !0, this._debounceTemplate(this._render), this._flushTemplates()
        },
        _render: function() {
            this.collection;
            this._needFullRefresh ? (this._applyFullRefresh(), this._needFullRefresh = !1) : this._keySplices.length && (this._sortFn ? this._applySplicesUserSort(this._keySplices) : this._filterFn ? this._applyFullRefresh() : this._applySplicesArrayOrder(this._indexSplices)), this._keySplices = [], this._indexSplices = [];
            for (var a = this._keyToInstIdx = {}, b = this._instances.length - 1; b >= 0; b--) {
                var c = this._instances[b];
                c.isPlaceholder && b < this._limit ? c = this._insertInstance(b, c.__key__) : !c.isPlaceholder && b >= this._limit && (c = this._downgradeInstance(b, c.__key__)), a[c.__key__] = b, c.isPlaceholder || c.__setProperty(this.indexAs, b, !0)
            }
            this._pool.length = 0, this._setRenderedItemCount(this._instances.length), this.fire("dom-change"), this._tryRenderChunk()
        },
        _applyFullRefresh: function() {
            var a, b = this.collection;
            if (this._sortFn) a = b ? b.getKeys() : [];
            else {
                a = [];
                var c = this.items;
                if (c)
                    for (var d = 0; d < c.length; d++) a.push(b.getKey(c[d]))
            }
            var e = this;
            this._filterFn && (a = a.filter(function(a) {
                return e._filterFn(b.getItem(a))
            })), this._sortFn && a.sort(function(a, c) {
                return e._sortFn(b.getItem(a), b.getItem(c))
            });
            for (var d = 0; d < a.length; d++) {
                var f = a[d],
                    g = this._instances[d];
                g ? (g.__key__ = f, !g.isPlaceholder && d < this._limit && g.__setProperty(this.as, b.getItem(f), !0)) : d < this._limit ? this._insertInstance(d, f) : this._insertPlaceholder(d, f)
            }
            for (var h = this._instances.length - 1; h >= d; h--) this._detachAndRemoveInstance(h)
        },
        _numericSort: function(a, b) {
            return a - b
        },
        _applySplicesUserSort: function(a) {
            for (var b, c = this.collection, d = (this._instances, {}), e = 0; e < a.length && (b = a[e]); e++) {
                for (var f = 0; f < b.removed.length; f++) {
                    var g = b.removed[f];
                    d[g] = d[g] ? null : -1
                }
                for (var f = 0; f < b.added.length; f++) {
                    var g = b.added[f];
                    d[g] = d[g] ? null : 1
                }
            }
            var h = [],
                i = [];
            for (var g in d) - 1 === d[g] && h.push(this._keyToInstIdx[g]), 1 === d[g] && i.push(g);
            if (h.length) {
                h.sort(this._numericSort);
                for (var e = h.length - 1; e >= 0; e--) {
                    var j = h[e];
                    void 0 !== j && this._detachAndRemoveInstance(j)
                }
            }
            var k = this;
            if (i.length) {
                this._filterFn && (i = i.filter(function(a) {
                    return k._filterFn(c.getItem(a))
                })), i.sort(function(a, b) {
                    return k._sortFn(c.getItem(a), c.getItem(b))
                });
                for (var l = 0, e = 0; e < i.length; e++) l = this._insertRowUserSort(l, i[e])
            }
        },
        _insertRowUserSort: function(a, b) {
            for (var c = this.collection, d = c.getItem(b), e = this._instances.length - 1, f = -1; e >= a;) {
                var g = a + e >> 1,
                    h = this._instances[g].__key__,
                    i = this._sortFn(c.getItem(h), d);
                if (0 > i) a = g + 1;
                else {
                    if (!(i > 0)) {
                        f = g;
                        break
                    }
                    e = g - 1
                }
            }
            return 0 > f && (f = e + 1), this._insertPlaceholder(f, b), f
        },
        _applySplicesArrayOrder: function(a) {
            for (var b, c = (this.collection, 0); c < a.length && (b = a[c]); c++) {
                for (var d = 0; d < b.removed.length; d++) this._detachAndRemoveInstance(b.index);
                for (var d = 0; d < b.addedKeys.length; d++) this._insertPlaceholder(b.index + d, b.addedKeys[d])
            }
        },
        _detachInstance: function(a) {
            var b = this._instances[a];
            if (!b.isPlaceholder) {
                for (var c = 0; c < b._children.length; c++) {
                    var d = b._children[c];
                    Polymer.dom(b.root).appendChild(d)
                }
                return b
            }
        },
        _attachInstance: function(a, b) {
            var c = this._instances[a];
            c.isPlaceholder || b.insertBefore(c.root, this)
        },
        _detachAndRemoveInstance: function(a) {
            var b = this._detachInstance(a);
            b && this._pool.push(b), this._instances.splice(a, 1)
        },
        _insertPlaceholder: function(a, b) {
            this._instances.splice(a, 0, {
                isPlaceholder: !0,
                __key__: b
            })
        },
        _stampInstance: function(a, b) {
            var c = {
                __key__: b
            };
            return c[this.as] = this.collection.getItem(b), c[this.indexAs] = a, this.stamp(c)
        },
        _insertInstance: function(a, b) {
            var c = this._pool.pop();
            c ? (c.__setProperty(this.as, this.collection.getItem(b), !0), c.__setProperty("__key__", b, !0)) : c = this._stampInstance(a, b);
            var d = this._instances[a + 1],
                e = d && !d.isPlaceholder ? d._children[0] : this,
                f = Polymer.dom(this).parentNode;
            return Polymer.dom(f).insertBefore(c.root, e), this._instances[a] = c, c
        },
        _downgradeInstance: function(a, b) {
            var c = this._detachInstance(a);
            return c && this._pool.push(c), c = {
                isPlaceholder: !0,
                __key__: b
            }, this._instances[a] = c, c
        },
        _showHideChildren: function(a) {
            for (var b = 0; b < this._instances.length; b++) this._instances[b]._showHideChildren(a)
        },
        _forwardInstanceProp: function(a, b, c) {
            if (b == this.as) {
                var d;
                d = this._sortFn || this._filterFn ? this.items.indexOf(this.collection.getItem(a.__key__)) : a[this.indexAs], this.set("items." + d, c)
            }
        },
        _forwardInstancePath: function(a, b, c) {
            0 === b.indexOf(this.as + ".") && this._notifyPath("items." + a.__key__ + "." + b.slice(this.as.length + 1), c)
        },
        _forwardParentProp: function(a, b) {
            for (var c, d = this._instances, e = 0; e < d.length && (c = d[e]); e++) c.isPlaceholder || c.__setProperty(a, b, !0)
        },
        _forwardParentPath: function(a, b) {
            for (var c, d = this._instances, e = 0; e < d.length && (c = d[e]); e++) c.isPlaceholder || c._notifyPath(a, b, !0)
        },
        _forwardItemPath: function(a, b) {
            if (this._keyToInstIdx) {
                var c = a.indexOf("."),
                    d = a.substring(0, 0 > c ? a.length : c),
                    e = this._keyToInstIdx[d],
                    f = this._instances[e];
                f && !f.isPlaceholder && (c >= 0 ? (a = this.as + "." + a.substring(c + 1), f._notifyPath(a, b, !0)) : f.__setProperty(this.as, b, !0))
            }
        },
        itemForElement: function(a) {
            var b = this.modelForElement(a);
            return b && b[this.as]
        },
        keyForElement: function(a) {
            var b = this.modelForElement(a);
            return b && b.__key__
        },
        indexForElement: function(a) {
            var b = this.modelForElement(a);
            return b && b[this.indexAs]
        }
    }), Polymer({
        is: "array-selector",
        _template: null,
        properties: {
            items: {
                type: Array,
                observer: "clearSelection"
            },
            multi: {
                type: Boolean,
                value: !1,
                observer: "clearSelection"
            },
            selected: {
                type: Object,
                notify: !0
            },
            selectedItem: {
                type: Object,
                notify: !0
            },
            toggle: {
                type: Boolean,
                value: !1
            }
        },
        clearSelection: function() {
            if (Array.isArray(this.selected))
                for (var a = 0; a < this.selected.length; a++) this.unlinkPaths("selected." + a);
            else this.unlinkPaths("selected"), this.unlinkPaths("selectedItem");
            this.multi ? this.selected && !this.selected.length || (this.selected = [], this._selectedColl = Polymer.Collection.get(this.selected)) : (this.selected = null, this._selectedColl = null), this.selectedItem = null
        },
        isSelected: function(a) {
            return this.multi ? void 0 !== this._selectedColl.getKey(a) : this.selected == a
        },
        deselect: function(a) {
            if (this.multi) {
                if (this.isSelected(a)) {
                    var b = this._selectedColl.getKey(a);
                    this.arrayDelete("selected", a), this.unlinkPaths("selected." + b)
                }
            } else this.selected = null, this.selectedItem = null, this.unlinkPaths("selected"), this.unlinkPaths("selectedItem")
        },
        select: function(a) {
            var b = Polymer.Collection.get(this.items),
                c = b.getKey(a);
            if (this.multi)
                if (this.isSelected(a)) this.toggle && this.deselect(a);
                else {
                    this.push("selected", a);
                    var d = this._selectedColl.getKey(a);
                    this.linkPaths("selected." + d, "items." + c)
                }
            else this.toggle && a == this.selected ? this.deselect() : (this.selected = a, this.selectedItem = a, this.linkPaths("selected", "items." + c), this.linkPaths("selectedItem", "items." + c))
        }
    }), Polymer({
        is: "dom-if",
        "extends": "template",
        _template: null,
        properties: {
            "if": {
                type: Boolean,
                value: !1,
                observer: "_queueRender"
            },
            restamp: {
                type: Boolean,
                value: !1,
                observer: "_queueRender"
            }
        },
        behaviors: [Polymer.Templatizer],
        _queueRender: function() {
            this._debounceTemplate(this._render)
        },
        detached: function() {
            this.parentNode && (this.parentNode.nodeType != Node.DOCUMENT_FRAGMENT_NODE || Polymer.Settings.hasShadow && this.parentNode instanceof ShadowRoot) || this._teardownInstance()
        },
        attached: function() {
            this["if"] && this.ctor && this.async(this._ensureInstance)
        },
        render: function() {
            this._flushTemplates()
        },
        _render: function() {
            this["if"] ? (this.ctor || this.templatize(this), this._ensureInstance(), this._showHideChildren()) : this.restamp && this._teardownInstance(), !this.restamp && this._instance && this._showHideChildren(), this["if"] != this._lastIf && (this.fire("dom-change"), this._lastIf = this["if"])
        },
        _ensureInstance: function() {
            var a = Polymer.dom(this).parentNode;
            if (a) {
                var b = Polymer.dom(a);
                if (this._instance) {
                    var c = this._instance._children;
                    if (c && c.length) {
                        var d = Polymer.dom(this).previousSibling;
                        if (d !== c[c.length - 1])
                            for (var e, f = 0; f < c.length && (e = c[f]); f++) b.insertBefore(e, this)
                    }
                } else {
                    this._instance = this.stamp();
                    var g = this._instance.root;
                    b.insertBefore(g, this)
                }
            }
        },
        _teardownInstance: function() {
            if (this._instance) {
                var a = this._instance._children;
                if (a && a.length)
                    for (var b, c = Polymer.dom(Polymer.dom(a[0]).parentNode), d = 0; d < a.length && (b = a[d]); d++) c.removeChild(b);
                this._instance = null
            }
        },
        _showHideChildren: function() {
            var a = this.__hideTemplateChildren__ || !this["if"];
            this._instance && this._instance._showHideChildren(a)
        },
        _forwardParentProp: function(a, b) {
            this._instance && (this._instance[a] = b)
        },
        _forwardParentPath: function(a, b) {
            this._instance && this._instance._notifyPath(a, b, !0)
        }
    }), Polymer({
        is: "dom-bind",
        "extends": "template",
        _template: null,
        created: function() {
            var a = this;
            Polymer.RenderStatus.whenReady(function() {
                a._markImportsReady()
            })
        },
        _ensureReady: function() {
            this._readied || this._readySelf()
        },
        _markImportsReady: function() {
            this._importsReady = !0, this._ensureReady()
        },
        _registerFeatures: function() {
            this._prepConstructor()
        },
        _insertChildren: function() {
            var a = Polymer.dom(Polymer.dom(this).parentNode);
            a.insertBefore(this.root, this)
        },
        _removeChildren: function() {
            if (this._children)
                for (var a = 0; a < this._children.length; a++) this.root.appendChild(this._children[a])
        },
        _initFeatures: function() {},
        _scopeElementClass: function(a, b) {
            return this.dataHost ? this.dataHost._scopeElementClass(a, b) : b
        },
        _prepConfigure: function() {
            var a = {};
            for (var b in this._propertyEffects) a[b] = this[b];
            var c = this._setupConfigure;
            this._setupConfigure = function() {
                c.call(this, a)
            }
        },
        attached: function() {
            this._importsReady && this.render()
        },
        detached: function() {
            this._removeChildren()
        },
        render: function() {
            this._ensureReady(), this._children || (this._template = this, this._prepAnnotations(), this._prepEffects(), this._prepBehaviors(), this._prepConfigure(), this._prepBindings(), this._prepPropertyInfo(), Polymer.Base._initFeatures.call(this), this._children = Polymer.TreeApi.arrayCopyChildNodes(this.root)), this._insertChildren(), this.fire("dom-change")
        }
    }), console.warn("This file is deprecated. Please use `iron-flex-layout/iron-flex-layout-classes.html`, and one of the specific dom-modules instead"), console.warn("This file is deprecated. Please use `iron-flex-layout/iron-flex-layout-classes.html`, and one of the specific dom-modules instead"),
    function() {
        var a = {},
            b = {},
            c = null;
        Polymer.IronMeta = Polymer({
            is: "iron-meta",
            properties: {
                type: {
                    type: String,
                    value: "default",
                    observer: "_typeChanged"
                },
                key: {
                    type: String,
                    observer: "_keyChanged"
                },
                value: {
                    type: Object,
                    notify: !0,
                    observer: "_valueChanged"
                },
                self: {
                    type: Boolean,
                    observer: "_selfChanged"
                },
                list: {
                    type: Array,
                    notify: !0
                }
            },
            hostAttributes: {
                hidden: !0
            },
            factoryImpl: function(a) {
                if (a)
                    for (var b in a) switch (b) {
                        case "type":
                        case "key":
                        case "value":
                            this[b] = a[b]
                    }
            },
            created: function() {
                this._metaDatas = a, this._metaArrays = b
            },
            _keyChanged: function(a, b) {
                this._resetRegistration(b)
            },
            _valueChanged: function(a) {
                this._resetRegistration(this.key)
            },
            _selfChanged: function(a) {
                a && (this.value = this)
            },
            _typeChanged: function(c) {
                this._unregisterKey(this.key), a[c] || (a[c] = {}), this._metaData = a[c], b[c] || (b[c] = []), this.list = b[c], this._registerKeyValue(this.key, this.value)
            },
            byKey: function(a) {
                return this._metaData && this._metaData[a]
            },
            _resetRegistration: function(a) {
                this._unregisterKey(a), this._registerKeyValue(this.key, this.value)
            },
            _unregisterKey: function(a) {
                this._unregister(a, this._metaData, this.list)
            },
            _registerKeyValue: function(a, b) {
                this._register(a, b, this._metaData, this.list)
            },
            _register: function(a, b, c, d) {
                a && c && void 0 !== b && (c[a] = b, d.push(b))
            },
            _unregister: function(a, b, c) {
                if (a && b && a in b) {
                    var d = b[a];
                    delete b[a], this.arrayDelete(c, d)
                }
            }
        }), Polymer.IronMeta.getIronMeta = function() {
            return null === c && (c = new Polymer.IronMeta), c
        }, Polymer.IronMetaQuery = Polymer({
            is: "iron-meta-query",
            properties: {
                type: {
                    type: String,
                    value: "default",
                    observer: "_typeChanged"
                },
                key: {
                    type: String,
                    observer: "_keyChanged"
                },
                value: {
                    type: Object,
                    notify: !0,
                    readOnly: !0
                },
                list: {
                    type: Array,
                    notify: !0
                }
            },
            factoryImpl: function(a) {
                if (a)
                    for (var b in a) switch (b) {
                        case "type":
                        case "key":
                            this[b] = a[b]
                    }
            },
            created: function() {
                this._metaDatas = a, this._metaArrays = b
            },
            _keyChanged: function(a) {
                this._setValue(this._metaData && this._metaData[a])
            },
            _typeChanged: function(c) {
                this._metaData = a[c], this.list = b[c], this.key && this._keyChanged(this.key)
            },
            byKey: function(a) {
                return this._metaData && this._metaData[a]
            }
        })
    }(), Polymer.NeonAnimatableBehavior = {
        properties: {
            animationConfig: {
                type: Object
            },
            entryAnimation: {
                observer: "_entryAnimationChanged",
                type: String
            },
            exitAnimation: {
                observer: "_exitAnimationChanged",
                type: String
            }
        },
        _entryAnimationChanged: function() {
            this.animationConfig = this.animationConfig || {}, this.animationConfig.entry = [{
                name: this.entryAnimation,
                node: this
            }]
        },
        _exitAnimationChanged: function() {
            this.animationConfig = this.animationConfig || {}, this.animationConfig.exit = [{
                name: this.exitAnimation,
                node: this
            }]
        },
        _copyProperties: function(a, b) {
            for (var c in b) a[c] = b[c]
        },
        _cloneConfig: function(a) {
            var b = {
                isClone: !0
            };
            return this._copyProperties(b, a), b
        },
        _getAnimationConfigRecursive: function(a, b, c) {
            if (this.animationConfig) {
                if (this.animationConfig.value && "function" == typeof this.animationConfig.value) return void this._warn(this._logf("playAnimation", "Please put 'animationConfig' inside of your components 'properties' object instead of outside of it."));
                var d;
                if (d = a ? this.animationConfig[a] : this.animationConfig, Array.isArray(d) || (d = [d]), d)
                    for (var e, f = 0; e = d[f]; f++)
                        if (e.animatable) e.animatable._getAnimationConfigRecursive(e.type || a, b, c);
                        else if (e.id) {
                    var g = b[e.id];
                    g ? (g.isClone || (b[e.id] = this._cloneConfig(g), g = b[e.id]), this._copyProperties(g, e)) : b[e.id] = e
                } else c.push(e)
            }
        },
        getAnimationConfig: function(a) {
            var b = {},
                c = [];
            this._getAnimationConfigRecursive(a, b, c);
            for (var d in b) c.push(b[d]);
            return c
        }
    }, Polymer.NeonAnimationRunnerBehaviorImpl = {
        _configureAnimations: function(a) {
            var b = [];
            if (a.length > 0)
                for (var c, d = 0; c = a[d]; d++) {
                    var e = document.createElement(c.name);
                    if (e.isNeonAnimation) {
                        var f = null;
                        try {
                            f = e.configure(c), "function" != typeof f.cancel && (f = document.timeline.play(f))
                        } catch (g) {
                            f = null, console.warn("Couldnt play", "(", c.name, ").", g)
                        }
                        f && b.push({
                            neonAnimation: e,
                            config: c,
                            animation: f
                        })
                    } else console.warn(this.is + ":", c.name, "not found!")
                }
            return b
        },
        _shouldComplete: function(a) {
            for (var b = !0, c = 0; c < a.length; c++)
                if ("finished" != a[c].animation.playState) {
                    b = !1;
                    break
                }
            return b
        },
        _complete: function(a) {
            for (var b = 0; b < a.length; b++) a[b].neonAnimation.complete(a[b].config);
            for (var b = 0; b < a.length; b++) a[b].animation.cancel()
        },
        playAnimation: function(a, b) {
            var c = this.getAnimationConfig(a);
            if (c) {
                this._active = this._active || {}, this._active[a] && (this._complete(this._active[a]), delete this._active[a]);
                var d = this._configureAnimations(c);
                if (0 == d.length) return void this.fire("neon-animation-finish", b, {
                    bubbles: !1
                });
                this._active[a] = d;
                for (var e = 0; e < d.length; e++) d[e].animation.onfinish = function() {
                    this._shouldComplete(d) && (this._complete(d), delete this._active[a], this.fire("neon-animation-finish", b, {
                        bubbles: !1
                    }))
                }.bind(this)
            }
        },
        cancelAnimation: function() {
            for (var a in this._animations) this._animations[a].cancel();
            this._animations = {}
        }
    }, Polymer.NeonAnimationRunnerBehavior = [Polymer.NeonAnimatableBehavior, Polymer.NeonAnimationRunnerBehaviorImpl], Polymer.IronFitBehavior = {
        properties: {
            sizingTarget: {
                type: Object,
                value: function() {
                    return this
                }
            },
            fitInto: {
                type: Object,
                value: window
            },
            noOverlap: {
                type: Boolean
            },
            positionTarget: {
                type: Element
            },
            horizontalAlign: {
                type: String
            },
            verticalAlign: {
                type: String
            },
            dynamicAlign: {
                type: Boolean
            },
            horizontalOffset: {
                type: Number,
                value: 0,
                notify: !0
            },
            verticalOffset: {
                type: Number,
                value: 0,
                notify: !0
            },
            autoFitOnAttach: {
                type: Boolean,
                value: !1
            },
            _fitInfo: {
                type: Object
            }
        },
        get _fitWidth() {
            var a;
            return a = this.fitInto === window ? this.fitInto.innerWidth : this.fitInto.getBoundingClientRect().width
        },
        get _fitHeight() {
            var a;
            return a = this.fitInto === window ? this.fitInto.innerHeight : this.fitInto.getBoundingClientRect().height
        },
        get _fitLeft() {
            var a;
            return a = this.fitInto === window ? 0 : this.fitInto.getBoundingClientRect().left
        },
        get _fitTop() {
            var a;
            return a = this.fitInto === window ? 0 : this.fitInto.getBoundingClientRect().top
        },
        get _defaultPositionTarget() {
            var a = Polymer.dom(this).parentNode;
            return a && a.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (a = a.host), a
        },
        get _localeHorizontalAlign() {
            if (this._isRTL) {
                if ("right" === this.horizontalAlign) return "left";
                if ("left" === this.horizontalAlign) return "right"
            }
            return this.horizontalAlign
        },
        attached: function() {
            this._isRTL = "rtl" == window.getComputedStyle(this).direction, this.positionTarget = this.positionTarget || this._defaultPositionTarget, this.autoFitOnAttach && ("none" === window.getComputedStyle(this).display ? setTimeout(function() {
                this.fit()
            }.bind(this)) : this.fit())
        },
        fit: function() {
            this.position(), this.constrain(), this.center()
        },
        _discoverInfo: function() {
            if (!this._fitInfo) {
                var a = window.getComputedStyle(this),
                    b = window.getComputedStyle(this.sizingTarget);
                this._fitInfo = {
                    inlineStyle: {
                        top: this.style.top || "",
                        left: this.style.left || "",
                        position: this.style.position || ""
                    },
                    sizerInlineStyle: {
                        maxWidth: this.sizingTarget.style.maxWidth || "",
                        maxHeight: this.sizingTarget.style.maxHeight || "",
                        boxSizing: this.sizingTarget.style.boxSizing || ""
                    },
                    positionedBy: {
                        vertically: "auto" !== a.top ? "top" : "auto" !== a.bottom ? "bottom" : null,
                        horizontally: "auto" !== a.left ? "left" : "auto" !== a.right ? "right" : null
                    },
                    sizedBy: {
                        height: "none" !== b.maxHeight,
                        width: "none" !== b.maxWidth,
                        minWidth: parseInt(b.minWidth, 10) || 0,
                        minHeight: parseInt(b.minHeight, 10) || 0
                    },
                    margin: {
                        top: parseInt(a.marginTop, 10) || 0,
                        right: parseInt(a.marginRight, 10) || 0,
                        bottom: parseInt(a.marginBottom, 10) || 0,
                        left: parseInt(a.marginLeft, 10) || 0
                    }
                }, this.verticalOffset && (this._fitInfo.margin.top = this._fitInfo.margin.bottom = this.verticalOffset, this._fitInfo.inlineStyle.marginTop = this.style.marginTop || "", this._fitInfo.inlineStyle.marginBottom = this.style.marginBottom || "", this.style.marginTop = this.style.marginBottom = this.verticalOffset + "px"), this.horizontalOffset && (this._fitInfo.margin.left = this._fitInfo.margin.right = this.horizontalOffset, this._fitInfo.inlineStyle.marginLeft = this.style.marginLeft || "", this._fitInfo.inlineStyle.marginRight = this.style.marginRight || "", this.style.marginLeft = this.style.marginRight = this.horizontalOffset + "px")
            }
        },
        resetFit: function() {
            var a = this._fitInfo || {};
            for (var b in a.sizerInlineStyle) this.sizingTarget.style[b] = a.sizerInlineStyle[b];
            for (var b in a.inlineStyle) this.style[b] = a.inlineStyle[b];
            this._fitInfo = null
        },
        refit: function() {
            var a = this.sizingTarget.scrollLeft,
                b = this.sizingTarget.scrollTop;
            this.resetFit(), this.fit(), this.sizingTarget.scrollLeft = a, this.sizingTarget.scrollTop = b;
        },
        position: function() {
            if (this.horizontalAlign || this.verticalAlign) {
                this._discoverInfo(), this.style.position = "fixed", this.sizingTarget.style.boxSizing = "border-box", this.style.left = "0px", this.style.top = "0px";
                var a = this.getBoundingClientRect(),
                    b = this.__getNormalizedRect(this.positionTarget),
                    c = this.__getNormalizedRect(this.fitInto),
                    d = this._fitInfo.margin,
                    e = {
                        width: a.width + d.left + d.right,
                        height: a.height + d.top + d.bottom
                    },
                    f = this.__getPosition(this._localeHorizontalAlign, this.verticalAlign, e, b, c),
                    g = f.left + d.left,
                    h = f.top + d.top,
                    i = Math.min(c.right - d.right, g + a.width),
                    j = Math.min(c.bottom - d.bottom, h + a.height),
                    k = this._fitInfo.sizedBy.minWidth,
                    l = this._fitInfo.sizedBy.minHeight;
                g < d.left && (g = d.left, k > i - g && (g = i - k)), h < d.top && (h = d.top, l > j - h && (h = j - l)), this.sizingTarget.style.maxWidth = i - g + "px", this.sizingTarget.style.maxHeight = j - h + "px", this.style.left = g - a.left + "px", this.style.top = h - a.top + "px"
            }
        },
        constrain: function() {
            if (!this.horizontalAlign && !this.verticalAlign) {
                this._discoverInfo();
                var a = this._fitInfo;
                a.positionedBy.vertically || (this.style.position = "fixed", this.style.top = "0px"), a.positionedBy.horizontally || (this.style.position = "fixed", this.style.left = "0px"), this.sizingTarget.style.boxSizing = "border-box";
                var b = this.getBoundingClientRect();
                a.sizedBy.height || this.__sizeDimension(b, a.positionedBy.vertically, "top", "bottom", "Height"), a.sizedBy.width || this.__sizeDimension(b, a.positionedBy.horizontally, "left", "right", "Width")
            }
        },
        _sizeDimension: function(a, b, c, d, e) {
            this.__sizeDimension(a, b, c, d, e)
        },
        __sizeDimension: function(a, b, c, d, e) {
            var f = this._fitInfo,
                g = this.__getNormalizedRect(this.fitInto),
                h = "Width" === e ? g.width : g.height,
                i = b === d,
                j = i ? h - a[d] : a[c],
                k = f.margin[i ? c : d],
                l = "offset" + e,
                m = this[l] - this.sizingTarget[l];
            this.sizingTarget.style["max" + e] = h - k - j - m + "px"
        },
        center: function() {
            if (!this.horizontalAlign && !this.verticalAlign) {
                this._discoverInfo();
                var a = this._fitInfo.positionedBy;
                if (!a.vertically || !a.horizontally) {
                    this.style.position = "fixed", a.vertically || (this.style.top = "0px"), a.horizontally || (this.style.left = "0px");
                    var b = this.getBoundingClientRect(),
                        c = this.__getNormalizedRect(this.fitInto);
                    if (!a.vertically) {
                        var d = c.top - b.top + (c.height - b.height) / 2;
                        this.style.top = d + "px"
                    }
                    if (!a.horizontally) {
                        var e = c.left - b.left + (c.width - b.width) / 2;
                        this.style.left = e + "px"
                    }
                }
            }
        },
        __getNormalizedRect: function(a) {
            return a === document.documentElement || a === window ? {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                right: window.innerWidth,
                bottom: window.innerHeight
            } : a.getBoundingClientRect()
        },
        __getCroppedArea: function(a, b, c) {
            var d = Math.min(0, a.top) + Math.min(0, c.bottom - (a.top + b.height)),
                e = Math.min(0, a.left) + Math.min(0, c.right - (a.left + b.width));
            return Math.abs(d) * b.width + Math.abs(e) * b.height
        },
        __getPosition: function(a, b, c, d, e) {
            var f = [{
                verticalAlign: "top",
                horizontalAlign: "left",
                top: d.top,
                left: d.left
            }, {
                verticalAlign: "top",
                horizontalAlign: "right",
                top: d.top,
                left: d.right - c.width
            }, {
                verticalAlign: "bottom",
                horizontalAlign: "left",
                top: d.bottom - c.height,
                left: d.left
            }, {
                verticalAlign: "bottom",
                horizontalAlign: "right",
                top: d.bottom - c.height,
                left: d.right - c.width
            }];
            if (this.noOverlap) {
                for (var g = 0, h = f.length; h > g; g++) {
                    var i = {};
                    for (var j in f[g]) i[j] = f[g][j];
                    f.push(i)
                }
                f[0].top = f[1].top += d.height, f[2].top = f[3].top -= d.height, f[4].left = f[6].left += d.width, f[5].left = f[7].left -= d.width
            }
            b = "auto" === b ? null : b, a = "auto" === a ? null : a;
            for (var k, g = 0; g < f.length; g++) {
                var l = f[g];
                if (!this.dynamicAlign && !this.noOverlap && l.verticalAlign === b && l.horizontalAlign === a) {
                    k = l;
                    break
                }
                var m = !(b && l.verticalAlign !== b || a && l.horizontalAlign !== a);
                if (this.dynamicAlign || m) {
                    k = k || l, l.croppedArea = this.__getCroppedArea(l, c, e);
                    var n = l.croppedArea - k.croppedArea;
                    if ((0 > n || 0 === n && m) && (k = l), 0 === k.croppedArea && m) break
                }
            }
            return k
        }
    }, Polymer.IronResizableBehavior = {
        properties: {
            _parentResizable: {
                type: Object,
                observer: "_parentResizableChanged"
            },
            _notifyingDescendant: {
                type: Boolean,
                value: !1
            }
        },
        listeners: {
            "iron-request-resize-notifications": "_onIronRequestResizeNotifications"
        },
        created: function() {
            this._interestedResizables = [], this._boundNotifyResize = this.notifyResize.bind(this)
        },
        attached: function() {
            this.fire("iron-request-resize-notifications", null, {
                node: this,
                bubbles: !0,
                cancelable: !0
            }), this._parentResizable || (window.addEventListener("resize", this._boundNotifyResize), this.notifyResize())
        },
        detached: function() {
            this._parentResizable ? this._parentResizable.stopResizeNotificationsFor(this) : window.removeEventListener("resize", this._boundNotifyResize), this._parentResizable = null
        },
        notifyResize: function() {
            this.isAttached && (this._interestedResizables.forEach(function(a) {
                this.resizerShouldNotify(a) && this._notifyDescendant(a)
            }, this), this._fireResize())
        },
        assignParentResizable: function(a) {
            this._parentResizable = a
        },
        stopResizeNotificationsFor: function(a) {
            var b = this._interestedResizables.indexOf(a);
            b > -1 && (this._interestedResizables.splice(b, 1), this.unlisten(a, "iron-resize", "_onDescendantIronResize"))
        },
        resizerShouldNotify: function(a) {
            return !0
        },
        _onDescendantIronResize: function(a) {
            return this._notifyingDescendant ? void a.stopPropagation() : void(Polymer.Settings.useShadow || this._fireResize())
        },
        _fireResize: function() {
            this.fire("iron-resize", null, {
                node: this,
                bubbles: !1
            })
        },
        _onIronRequestResizeNotifications: function(a) {
            var b = a.path ? a.path[0] : a.target;
            b !== this && (-1 === this._interestedResizables.indexOf(b) && (this._interestedResizables.push(b), this.listen(b, "iron-resize", "_onDescendantIronResize")), b.assignParentResizable(this), this._notifyDescendant(b), a.stopPropagation())
        },
        _parentResizableChanged: function(a) {
            a && window.removeEventListener("resize", this._boundNotifyResize)
        },
        _notifyDescendant: function(a) {
            this.isAttached && (this._notifyingDescendant = !0, a.notifyResize(), this._notifyingDescendant = !1)
        }
    },
    function() {
        "use strict";

        function a(a, b) {
            var c = "";
            if (a) {
                var d = a.toLowerCase();
                " " === d || n.test(d) ? c = "space" : o.test(d) ? c = "esc" : 1 == d.length ? b && !k.test(d) || (c = d) : c = m.test(d) ? d.replace("arrow", "") : "multiply" == d ? "*" : d
            }
            return c
        }

        function b(a) {
            var b = "";
            return a && (a in h ? b = h[a] : l.test(a) ? (a = parseInt(a.replace("U+", "0x"), 16), b = String.fromCharCode(a).toLowerCase()) : b = a.toLowerCase()), b
        }

        function c(a) {
            var b = "";
            return Number(a) && (b = a >= 65 && 90 >= a ? String.fromCharCode(32 + a) : a >= 112 && 123 >= a ? "f" + (a - 112) : a >= 48 && 57 >= a ? String(a - 48) : a >= 96 && 105 >= a ? String(a - 96) : i[a]), b
        }

        function d(d, e) {
            return d.key ? a(d.key, e) : d.detail && d.detail.key ? a(d.detail.key, e) : b(d.keyIdentifier) || c(d.keyCode) || ""
        }

        function e(a, b) {
            var c = d(b, a.hasModifiers);
            return c === a.key && (!a.hasModifiers || !!b.shiftKey == !!a.shiftKey && !!b.ctrlKey == !!a.ctrlKey && !!b.altKey == !!a.altKey && !!b.metaKey == !!a.metaKey)
        }

        function f(a) {
            return 1 === a.length ? {
                combo: a,
                key: a,
                event: "keydown"
            } : a.split("+").reduce(function(a, b) {
                var c = b.split(":"),
                    d = c[0],
                    e = c[1];
                return d in j ? (a[j[d]] = !0, a.hasModifiers = !0) : (a.key = d, a.event = e || "keydown"), a
            }, {
                combo: a.split(":").shift()
            })
        }

        function g(a) {
            return a.trim().split(" ").map(function(a) {
                return f(a)
            })
        }
        var h = {
                "U+0008": "backspace",
                "U+0009": "tab",
                "U+001B": "esc",
                "U+0020": "space",
                "U+007F": "del"
            },
            i = {
                8: "backspace",
                9: "tab",
                13: "enter",
                27: "esc",
                33: "pageup",
                34: "pagedown",
                35: "end",
                36: "home",
                32: "space",
                37: "left",
                38: "up",
                39: "right",
                40: "down",
                46: "del",
                106: "*"
            },
            j = {
                shift: "shiftKey",
                ctrl: "ctrlKey",
                alt: "altKey",
                meta: "metaKey"
            },
            k = /[a-z0-9*]/,
            l = /U\+/,
            m = /^arrow/,
            n = /^space(bar)?/,
            o = /^escape$/;
        Polymer.IronA11yKeysBehavior = {
            properties: {
                keyEventTarget: {
                    type: Object,
                    value: function() {
                        return this
                    }
                },
                stopKeyboardEventPropagation: {
                    type: Boolean,
                    value: !1
                },
                _boundKeyHandlers: {
                    type: Array,
                    value: function() {
                        return []
                    }
                },
                _imperativeKeyBindings: {
                    type: Object,
                    value: function() {
                        return {}
                    }
                }
            },
            observers: ["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],
            keyBindings: {},
            registered: function() {
                this._prepKeyBindings()
            },
            attached: function() {
                this._listenKeyEventListeners()
            },
            detached: function() {
                this._unlistenKeyEventListeners()
            },
            addOwnKeyBinding: function(a, b) {
                this._imperativeKeyBindings[a] = b, this._prepKeyBindings(), this._resetKeyEventListeners()
            },
            removeOwnKeyBindings: function() {
                this._imperativeKeyBindings = {}, this._prepKeyBindings(), this._resetKeyEventListeners()
            },
            keyboardEventMatchesKeys: function(a, b) {
                for (var c = g(b), d = 0; d < c.length; ++d)
                    if (e(c[d], a)) return !0;
                return !1
            },
            _collectKeyBindings: function() {
                var a = this.behaviors.map(function(a) {
                    return a.keyBindings
                });
                return -1 === a.indexOf(this.keyBindings) && a.push(this.keyBindings), a
            },
            _prepKeyBindings: function() {
                this._keyBindings = {}, this._collectKeyBindings().forEach(function(a) {
                    for (var b in a) this._addKeyBinding(b, a[b])
                }, this);
                for (var a in this._imperativeKeyBindings) this._addKeyBinding(a, this._imperativeKeyBindings[a]);
                for (var b in this._keyBindings) this._keyBindings[b].sort(function(a, b) {
                    var c = a[0].hasModifiers,
                        d = b[0].hasModifiers;
                    return c === d ? 0 : c ? -1 : 1
                })
            },
            _addKeyBinding: function(a, b) {
                g(a).forEach(function(a) {
                    this._keyBindings[a.event] = this._keyBindings[a.event] || [], this._keyBindings[a.event].push([a, b])
                }, this)
            },
            _resetKeyEventListeners: function() {
                this._unlistenKeyEventListeners(), this.isAttached && this._listenKeyEventListeners()
            },
            _listenKeyEventListeners: function() {
                this.keyEventTarget && Object.keys(this._keyBindings).forEach(function(a) {
                    var b = this._keyBindings[a],
                        c = this._onKeyBindingEvent.bind(this, b);
                    this._boundKeyHandlers.push([this.keyEventTarget, a, c]), this.keyEventTarget.addEventListener(a, c)
                }, this)
            },
            _unlistenKeyEventListeners: function() {
                for (var a, b, c, d; this._boundKeyHandlers.length;) a = this._boundKeyHandlers.pop(), b = a[0], c = a[1], d = a[2], b.removeEventListener(c, d)
            },
            _onKeyBindingEvent: function(a, b) {
                if (this.stopKeyboardEventPropagation && b.stopPropagation(), !b.defaultPrevented)
                    for (var c = 0; c < a.length; c++) {
                        var d = a[c][0],
                            f = a[c][1];
                        if (e(d, b) && (this._triggerKeyHandler(d, f, b), b.defaultPrevented)) return
                    }
            },
            _triggerKeyHandler: function(a, b, c) {
                var d = Object.create(a);
                d.keyboardEvent = c;
                var e = new CustomEvent(a.event, {
                    detail: d,
                    cancelable: !0
                });
                this[b].call(this, e), e.defaultPrevented && c.preventDefault()
            }
        }
    }(), Polymer.IronOverlayManagerClass = function() {
        this._overlays = [], this._minimumZ = 101, this._backdropElement = null, Polymer.Gestures.add(document, "tap", this._onCaptureClick.bind(this)), document.addEventListener("focus", this._onCaptureFocus.bind(this), !0), document.addEventListener("keydown", this._onCaptureKeyDown.bind(this), !0)
    }, Polymer.IronOverlayManagerClass.prototype = {
        constructor: Polymer.IronOverlayManagerClass,
        get backdropElement() {
            return this._backdropElement || (this._backdropElement = document.createElement("iron-overlay-backdrop")), this._backdropElement
        },
        get deepActiveElement() {
            for (var a = document.activeElement || document.body; a.root && Polymer.dom(a.root).activeElement;) a = Polymer.dom(a.root).activeElement;
            return a
        },
        _bringOverlayAtIndexToFront: function(a) {
            var b = this._overlays[a];
            if (b) {
                var c = this._overlays.length - 1,
                    d = this._overlays[c];
                if (d && this._shouldBeBehindOverlay(b, d) && c--, !(a >= c)) {
                    var e = Math.max(this.currentOverlayZ(), this._minimumZ);
                    for (this._getZ(b) <= e && this._applyOverlayZ(b, e); c > a;) this._overlays[a] = this._overlays[a + 1], a++;
                    this._overlays[c] = b
                }
            }
        },
        addOrRemoveOverlay: function(a) {
            a.opened ? this.addOverlay(a) : this.removeOverlay(a)
        },
        addOverlay: function(a) {
            var b = this._overlays.indexOf(a);
            if (b >= 0) return this._bringOverlayAtIndexToFront(b), void this.trackBackdrop();
            var c = this._overlays.length,
                d = this._overlays[c - 1],
                e = Math.max(this._getZ(d), this._minimumZ),
                f = this._getZ(a);
            if (d && this._shouldBeBehindOverlay(a, d)) {
                this._applyOverlayZ(d, e), c--;
                var g = this._overlays[c - 1];
                e = Math.max(this._getZ(g), this._minimumZ)
            }
            e >= f && this._applyOverlayZ(a, e), this._overlays.splice(c, 0, a), this.trackBackdrop()
        },
        removeOverlay: function(a) {
            var b = this._overlays.indexOf(a); - 1 !== b && (this._overlays.splice(b, 1), this.trackBackdrop())
        },
        currentOverlay: function() {
            var a = this._overlays.length - 1;
            return this._overlays[a]
        },
        currentOverlayZ: function() {
            return this._getZ(this.currentOverlay())
        },
        ensureMinimumZ: function(a) {
            this._minimumZ = Math.max(this._minimumZ, a)
        },
        focusOverlay: function() {
            var a = this.currentOverlay();
            a && a._applyFocus()
        },
        trackBackdrop: function() {
            var a = this._overlayWithBackdrop();
            (a || this._backdropElement) && (this.backdropElement.style.zIndex = this._getZ(a) - 1, this.backdropElement.opened = !!a)
        },
        getBackdrops: function() {
            for (var a = [], b = 0; b < this._overlays.length; b++) this._overlays[b].withBackdrop && a.push(this._overlays[b]);
            return a
        },
        backdropZ: function() {
            return this._getZ(this._overlayWithBackdrop()) - 1
        },
        _overlayWithBackdrop: function() {
            for (var a = 0; a < this._overlays.length; a++)
                if (this._overlays[a].withBackdrop) return this._overlays[a]
        },
        _getZ: function(a) {
            var b = this._minimumZ;
            if (a) {
                var c = Number(a.style.zIndex || window.getComputedStyle(a).zIndex);
                c === c && (b = c)
            }
            return b
        },
        _setZ: function(a, b) {
            a.style.zIndex = b
        },
        _applyOverlayZ: function(a, b) {
            this._setZ(a, b + 2)
        },
        _overlayInPath: function(a) {
            a = a || [];
            for (var b = 0; b < a.length; b++)
                if (a[b]._manager === this) return a[b]
        },
        _onCaptureClick: function(a) {
            var b = this.currentOverlay();
            b && this._overlayInPath(Polymer.dom(a).path) !== b && b._onCaptureClick(a)
        },
        _onCaptureFocus: function(a) {
            var b = this.currentOverlay();
            b && b._onCaptureFocus(a)
        },
        _onCaptureKeyDown: function(a) {
            var b = this.currentOverlay();
            b && (Polymer.IronA11yKeysBehavior.keyboardEventMatchesKeys(a, "esc") ? b._onCaptureEsc(a) : Polymer.IronA11yKeysBehavior.keyboardEventMatchesKeys(a, "tab") && b._onCaptureTab(a))
        },
        _shouldBeBehindOverlay: function(a, b) {
            return !a.alwaysOnTop && b.alwaysOnTop
        }
    }, Polymer.IronOverlayManager = new Polymer.IronOverlayManagerClass,
    function() {
        "use strict";
        var a = Element.prototype,
            b = a.matches || a.matchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector || a.webkitMatchesSelector;
        Polymer.IronFocusablesHelper = {
            getTabbableNodes: function(a) {
                var b = [],
                    c = this._collectTabbableNodes(a, b);
                return c ? this._sortByTabIndex(b) : b
            },
            isFocusable: function(a) {
                return b.call(a, "input, select, textarea, button, object") ? b.call(a, ":not([disabled])") : b.call(a, "a[href], area[href], iframe, [tabindex], [contentEditable]")
            },
            isTabbable: function(a) {
                return this.isFocusable(a) && b.call(a, ':not([tabindex="-1"])') && this._isVisible(a)
            },
            _normalizedTabIndex: function(a) {
                if (this.isFocusable(a)) {
                    var b = a.getAttribute("tabindex") || 0;
                    return Number(b)
                }
                return -1
            },
            _collectTabbableNodes: function(a, b) {
                if (a.nodeType !== Node.ELEMENT_NODE || !this._isVisible(a)) return !1;
                var c = a,
                    d = this._normalizedTabIndex(c),
                    e = d > 0;
                d >= 0 && b.push(c);
                var f;
                f = "content" === c.localName ? Polymer.dom(c).getDistributedNodes() : Polymer.dom(c.root || c).children;
                for (var g = 0; g < f.length; g++) {
                    var h = this._collectTabbableNodes(f[g], b);
                    e = e || h
                }
                return e
            },
            _isVisible: function(a) {
                var b = a.style;
                return "hidden" !== b.visibility && "none" !== b.display ? (b = window.getComputedStyle(a), "hidden" !== b.visibility && "none" !== b.display) : !1
            },
            _sortByTabIndex: function(a) {
                var b = a.length;
                if (2 > b) return a;
                var c = Math.ceil(b / 2),
                    d = this._sortByTabIndex(a.slice(0, c)),
                    e = this._sortByTabIndex(a.slice(c));
                return this._mergeSortByTabIndex(d, e)
            },
            _mergeSortByTabIndex: function(a, b) {
                for (var c = []; a.length > 0 && b.length > 0;) this._hasLowerTabOrder(a[0], b[0]) ? c.push(b.shift()) : c.push(a.shift());
                return c.concat(a, b)
            },
            _hasLowerTabOrder: function(a, b) {
                var c = Math.max(a.tabIndex, 0),
                    d = Math.max(b.tabIndex, 0);
                return 0 === c || 0 === d ? d > c : c > d
            }
        }
    }(),
    function() {
        "use strict";
        Polymer.IronOverlayBehaviorImpl = {
            properties: {
                opened: {
                    observer: "_openedChanged",
                    type: Boolean,
                    value: !1,
                    notify: !0
                },
                canceled: {
                    observer: "_canceledChanged",
                    readOnly: !0,
                    type: Boolean,
                    value: !1
                },
                withBackdrop: {
                    observer: "_withBackdropChanged",
                    type: Boolean
                },
                noAutoFocus: {
                    type: Boolean,
                    value: !1
                },
                noCancelOnEscKey: {
                    type: Boolean,
                    value: !1
                },
                noCancelOnOutsideClick: {
                    type: Boolean,
                    value: !1
                },
                closingReason: {
                    type: Object
                },
                restoreFocusOnClose: {
                    type: Boolean,
                    value: !1
                },
                alwaysOnTop: {
                    type: Boolean
                },
                _manager: {
                    type: Object,
                    value: Polymer.IronOverlayManager
                },
                _focusedChild: {
                    type: Object
                }
            },
            listeners: {
                "iron-resize": "_onIronResize"
            },
            get backdropElement() {
                return this._manager.backdropElement
            },
            get _focusNode() {
                return this._focusedChild || Polymer.dom(this).querySelector("[autofocus]") || this
            },
            get _focusableNodes() {
                return Polymer.IronFocusablesHelper.getTabbableNodes(this)
            },
            ready: function() {
                this.__isAnimating = !1, this.__shouldRemoveTabIndex = !1, this.__firstFocusableNode = this.__lastFocusableNode = null, this.__raf = null, this.__restoreFocusNode = null, this._ensureSetup()
            },
            attached: function() {
                this.opened && this._openedChanged(this.opened), this._observer = Polymer.dom(this).observeNodes(this._onNodesChange)
            },
            detached: function() {
                Polymer.dom(this).unobserveNodes(this._observer), this._observer = null, this.__raf && (window.cancelAnimationFrame(this.__raf), this.__raf = null), this._manager.removeOverlay(this)
            },
            toggle: function() {
                this._setCanceled(!1), this.opened = !this.opened
            },
            open: function() {
                this._setCanceled(!1), this.opened = !0
            },
            close: function() {
                this._setCanceled(!1), this.opened = !1
            },
            cancel: function(a) {
                var b = this.fire("iron-overlay-canceled", a, {
                    cancelable: !0
                });
                b.defaultPrevented || (this._setCanceled(!0), this.opened = !1)
            },
            invalidateTabbables: function() {
                this.__firstFocusableNode = this.__lastFocusableNode = null
            },
            _ensureSetup: function() {
                this._overlaySetup || (this._overlaySetup = !0, this.style.outline = "none", this.style.display = "none")
            },
            _openedChanged: function(a) {
                a ? this.removeAttribute("aria-hidden") : this.setAttribute("aria-hidden", "true"), this.isAttached && (this.__isAnimating = !0, this.__onNextAnimationFrame(this.__openedChanged))
            },
            _canceledChanged: function() {
                this.closingReason = this.closingReason || {}, this.closingReason.canceled = this.canceled
            },
            _withBackdropChanged: function() {
                this.withBackdrop && !this.hasAttribute("tabindex") ? (this.setAttribute("tabindex", "-1"), this.__shouldRemoveTabIndex = !0) : this.__shouldRemoveTabIndex && (this.removeAttribute("tabindex"), this.__shouldRemoveTabIndex = !1), this.opened && this.isAttached && this._manager.trackBackdrop()
            },
            _prepareRenderOpened: function() {
                this.__restoreFocusNode = this._manager.deepActiveElement, this._preparePositioning(), this.refit(), this._finishPositioning(), this.noAutoFocus && document.activeElement === this._focusNode && (this._focusNode.blur(), this.__restoreFocusNode.focus())
            },
            _renderOpened: function() {
                this._finishRenderOpened()
            },
            _renderClosed: function() {
                this._finishRenderClosed()
            },
            _finishRenderOpened: function() {
                this.notifyResize(), this.__isAnimating = !1, this.fire("iron-overlay-opened")
            },
            _finishRenderClosed: function() {
                this.style.display = "none", this.style.zIndex = "", this.notifyResize(), this.__isAnimating = !1, this.fire("iron-overlay-closed", this.closingReason)
            },
            _preparePositioning: function() {
                this.style.transition = this.style.webkitTransition = "none", this.style.transform = this.style.webkitTransform = "none", this.style.display = ""
            },
            _finishPositioning: function() {
                this.style.display = "none", this.scrollTop = this.scrollTop, this.style.transition = this.style.webkitTransition = "", this.style.transform = this.style.webkitTransform = "", this.style.display = "", this.scrollTop = this.scrollTop
            },
            _applyFocus: function() {
                if (this.opened) this.noAutoFocus || this._focusNode.focus();
                else {
                    this._focusNode.blur(), this._focusedChild = null, this.restoreFocusOnClose && this.__restoreFocusNode && this.__restoreFocusNode.focus(), this.__restoreFocusNode = null;
                    var a = this._manager.currentOverlay();
                    a && this !== a && a._applyFocus()
                }
            },
            _onCaptureClick: function(a) {
                this.noCancelOnOutsideClick || this.cancel(a)
            },
            _onCaptureFocus: function(a) {
                if (this.withBackdrop) {
                    var b = Polymer.dom(a).path; - 1 === b.indexOf(this) ? (a.stopPropagation(), this._applyFocus()) : this._focusedChild = b[0]
                }
            },
            _onCaptureEsc: function(a) {
                this.noCancelOnEscKey || this.cancel(a)
            },
            _onCaptureTab: function(a) {
                if (this.withBackdrop) {
                    this.__ensureFirstLastFocusables();
                    var b = a.shiftKey,
                        c = b ? this.__firstFocusableNode : this.__lastFocusableNode,
                        d = b ? this.__lastFocusableNode : this.__firstFocusableNode,
                        e = !1;
                    if (c === d) e = !0;
                    else {
                        var f = this._manager.deepActiveElement;
                        e = f === c || f === this
                    }
                    e && (a.preventDefault(), this._focusedChild = d, this._applyFocus())
                }
            },
            _onIronResize: function() {
                this.opened && !this.__isAnimating && this.__onNextAnimationFrame(this.refit)
            },
            _onNodesChange: function() {
                this.opened && !this.__isAnimating && (this.invalidateTabbables(), this.notifyResize())
            },
            __ensureFirstLastFocusables: function() {
                if (!this.__firstFocusableNode || !this.__lastFocusableNode) {
                    var a = this._focusableNodes;
                    this.__firstFocusableNode = a[0], this.__lastFocusableNode = a[a.length - 1]
                }
            },
            __openedChanged: function() {
                this.opened ? (this._prepareRenderOpened(), this._manager.addOverlay(this), this._applyFocus(), this._renderOpened()) : (this._manager.removeOverlay(this), this._applyFocus(), this._renderClosed())
            },
            __onNextAnimationFrame: function(a) {
                this.__raf && window.cancelAnimationFrame(this.__raf);
                var b = this;
                this.__raf = window.requestAnimationFrame(function() {
                    b.__raf = null, a.call(b)
                })
            }
        }, Polymer.IronOverlayBehavior = [Polymer.IronFitBehavior, Polymer.IronResizableBehavior, Polymer.IronOverlayBehaviorImpl]
    }(), Polymer.PaperDialogBehaviorImpl = {
        hostAttributes: {
            role: "dialog",
            tabindex: "-1"
        },
        properties: {
            modal: {
                type: Boolean,
                value: !1
            }
        },
        observers: ["_modalChanged(modal, _readied)"],
        listeners: {
            tap: "_onDialogClick"
        },
        ready: function() {
            this.__prevNoCancelOnOutsideClick = this.noCancelOnOutsideClick, this.__prevNoCancelOnEscKey = this.noCancelOnEscKey, this.__prevWithBackdrop = this.withBackdrop
        },
        _modalChanged: function(a, b) {
            b && (a ? (this.__prevNoCancelOnOutsideClick = this.noCancelOnOutsideClick, this.__prevNoCancelOnEscKey = this.noCancelOnEscKey, this.__prevWithBackdrop = this.withBackdrop, this.noCancelOnOutsideClick = !0, this.noCancelOnEscKey = !0, this.withBackdrop = !0) : (this.noCancelOnOutsideClick = this.noCancelOnOutsideClick && this.__prevNoCancelOnOutsideClick, this.noCancelOnEscKey = this.noCancelOnEscKey && this.__prevNoCancelOnEscKey, this.withBackdrop = this.withBackdrop && this.__prevWithBackdrop))
        },
        _updateClosingReasonConfirmed: function(a) {
            this.closingReason = this.closingReason || {}, this.closingReason.confirmed = a
        },
        _onDialogClick: function(a) {
            for (var b = Polymer.dom(a).path, c = 0; c < b.indexOf(this); c++) {
                var d = b[c];
                if (d.hasAttribute && (d.hasAttribute("dialog-dismiss") || d.hasAttribute("dialog-confirm"))) {
                    this._updateClosingReasonConfirmed(d.hasAttribute("dialog-confirm")), this.close(), a.stopPropagation();
                    break
                }
            }
        }
    }, Polymer.PaperDialogBehavior = [Polymer.IronOverlayBehavior, Polymer.PaperDialogBehaviorImpl], Polymer.IronRangeBehavior = {
        properties: {
            value: {
                type: Number,
                value: 0,
                notify: !0,
                reflectToAttribute: !0
            },
            min: {
                type: Number,
                value: 0,
                notify: !0
            },
            max: {
                type: Number,
                value: 100,
                notify: !0
            },
            step: {
                type: Number,
                value: 1,
                notify: !0
            },
            ratio: {
                type: Number,
                value: 0,
                readOnly: !0,
                notify: !0
            }
        },
        observers: ["_update(value, min, max, step)"],
        _calcRatio: function(a) {
            return (this._clampValue(a) - this.min) / (this.max - this.min)
        },
        _clampValue: function(a) {
            return Math.min(this.max, Math.max(this.min, this._calcStep(a)))
        },
        _calcStep: function(a) {
            if (a = parseFloat(a), !this.step) return a;
            var b = Math.round((a - this.min) / this.step);
            return this.step < 1 ? b / (1 / this.step) + this.min : b * this.step + this.min
        },
        _validateValue: function() {
            var a = this._clampValue(this.value);
            return this.value = this.oldValue = isNaN(a) ? this.oldValue : a, this.value !== a
        },
        _update: function() {
            this._validateValue(), this._setRatio(100 * this._calcRatio(this.value))
        }
    }, Polymer.IronControlState = {
        properties: {
            focused: {
                type: Boolean,
                value: !1,
                notify: !0,
                readOnly: !0,
                reflectToAttribute: !0
            },
            disabled: {
                type: Boolean,
                value: !1,
                notify: !0,
                observer: "_disabledChanged",
                reflectToAttribute: !0
            },
            _oldTabIndex: {
                type: Number
            },
            _boundFocusBlurHandler: {
                type: Function,
                value: function() {
                    return this._focusBlurHandler.bind(this)
                }
            }
        },
        observers: ["_changedControlState(focused, disabled)"],
        ready: function() {
            this.addEventListener("focus", this._boundFocusBlurHandler, !0), this.addEventListener("blur", this._boundFocusBlurHandler, !0)
        },
        _focusBlurHandler: function(a) {
            if (a.target === this) this._setFocused("focus" === a.type);
            else if (!this.shadowRoot) {
                var b = Polymer.dom(a).localTarget;
                this.isLightDescendant(b) || this.fire(a.type, {
                    sourceEvent: a
                }, {
                    node: this,
                    bubbles: a.bubbles,
                    cancelable: a.cancelable
                })
            }
        },
        _disabledChanged: function(a, b) {
            this.setAttribute("aria-disabled", a ? "true" : "false"), this.style.pointerEvents = a ? "none" : "", a ? (this._oldTabIndex = this.tabIndex, this._setFocused(!1), this.tabIndex = -1, this.blur()) : void 0 !== this._oldTabIndex && (this.tabIndex = this._oldTabIndex)
        },
        _changedControlState: function() {
            this._controlStateChanged && this._controlStateChanged()
        }
    }, Polymer.IronButtonStateImpl = {
        properties: {
            pressed: {
                type: Boolean,
                readOnly: !0,
                value: !1,
                reflectToAttribute: !0,
                observer: "_pressedChanged"
            },
            toggles: {
                type: Boolean,
                value: !1,
                reflectToAttribute: !0
            },
            active: {
                type: Boolean,
                value: !1,
                notify: !0,
                reflectToAttribute: !0
            },
            pointerDown: {
                type: Boolean,
                readOnly: !0,
                value: !1
            },
            receivedFocusFromKeyboard: {
                type: Boolean,
                readOnly: !0
            },
            ariaActiveAttribute: {
                type: String,
                value: "aria-pressed",
                observer: "_ariaActiveAttributeChanged"
            }
        },
        listeners: {
            down: "_downHandler",
            up: "_upHandler",
            tap: "_tapHandler"
        },
        observers: ["_detectKeyboardFocus(focused)", "_activeChanged(active, ariaActiveAttribute)"],
        keyBindings: {
            "enter:keydown": "_asyncClick",
            "space:keydown": "_spaceKeyDownHandler",
            "space:keyup": "_spaceKeyUpHandler"
        },
        _mouseEventRe: /^mouse/,
        _tapHandler: function() {
            this.toggles ? this._userActivate(!this.active) : this.active = !1
        },
        _detectKeyboardFocus: function(a) {
            this._setReceivedFocusFromKeyboard(!this.pointerDown && a)
        },
        _userActivate: function(a) {
            this.active !== a && (this.active = a, this.fire("change"))
        },
        _downHandler: function(a) {
            this._setPointerDown(!0), this._setPressed(!0), this._setReceivedFocusFromKeyboard(!1)
        },
        _upHandler: function() {
            this._setPointerDown(!1), this._setPressed(!1)
        },
        _spaceKeyDownHandler: function(a) {
            var b = a.detail.keyboardEvent,
                c = Polymer.dom(b).localTarget;
            this.isLightDescendant(c) || (b.preventDefault(), b.stopImmediatePropagation(), this._setPressed(!0))
        },
        _spaceKeyUpHandler: function(a) {
            var b = a.detail.keyboardEvent,
                c = Polymer.dom(b).localTarget;
            this.isLightDescendant(c) || (this.pressed && this._asyncClick(), this._setPressed(!1))
        },
        _asyncClick: function() {
            this.async(function() {
                this.click()
            }, 1)
        },
        _pressedChanged: function(a) {
            this._changedButtonState()
        },
        _ariaActiveAttributeChanged: function(a, b) {
            b && b != a && this.hasAttribute(b) && this.removeAttribute(b)
        },
        _activeChanged: function(a, b) {
            this.toggles ? this.setAttribute(this.ariaActiveAttribute, a ? "true" : "false") : this.removeAttribute(this.ariaActiveAttribute), this._changedButtonState()
        },
        _controlStateChanged: function() {
            this.disabled ? this._setPressed(!1) : this._changedButtonState()
        },
        _changedButtonState: function() {
            this._buttonStateChanged && this._buttonStateChanged()
        }
    }, Polymer.IronButtonState = [Polymer.IronA11yKeysBehavior, Polymer.IronButtonStateImpl], Polymer.PaperRippleBehavior = {
        properties: {
            noink: {
                type: Boolean,
                observer: "_noinkChanged"
            },
            _rippleContainer: {
                type: Object
            }
        },
        _buttonStateChanged: function() {
            this.focused && this.ensureRipple()
        },
        _downHandler: function(a) {
            Polymer.IronButtonStateImpl._downHandler.call(this, a), this.pressed && this.ensureRipple(a)
        },
        ensureRipple: function(a) {
            if (!this.hasRipple()) {
                this._ripple = this._createRipple(), this._ripple.noink = this.noink;
                var b = this._rippleContainer || this.root;
                if (b && Polymer.dom(b).appendChild(this._ripple), a) {
                    var c = Polymer.dom(this._rippleContainer || this),
                        d = Polymer.dom(a).rootTarget;
                    c.deepContains(d) && this._ripple.uiDownAction(a)
                }
            }
        },
        getRipple: function() {
            return this.ensureRipple(), this._ripple
        },
        hasRipple: function() {
            return Boolean(this._ripple)
        },
        _createRipple: function() {
            return document.createElement("paper-ripple")
        },
        _noinkChanged: function(a) {
            this.hasRipple() && (this._ripple.noink = a)
        }
    }, Polymer.PaperButtonBehaviorImpl = {
        properties: {
            elevation: {
                type: Number,
                reflectToAttribute: !0,
                readOnly: !0
            }
        },
        observers: ["_calculateElevation(focused, disabled, active, pressed, receivedFocusFromKeyboard)", "_computeKeyboardClass(receivedFocusFromKeyboard)"],
        hostAttributes: {
            role: "button",
            tabindex: "0",
            animated: !0
        },
        _calculateElevation: function() {
            var a = 1;
            this.disabled ? a = 0 : this.active || this.pressed ? a = 4 : this.receivedFocusFromKeyboard && (a = 3), this._setElevation(a)
        },
        _computeKeyboardClass: function(a) {
            this.toggleClass("keyboard-focus", a)
        },
        _spaceKeyDownHandler: function(a) {
            Polymer.IronButtonStateImpl._spaceKeyDownHandler.call(this, a), this.hasRipple() && this.getRipple().ripples.length < 1 && this._ripple.uiDownAction()
        },
        _spaceKeyUpHandler: function(a) {
            Polymer.IronButtonStateImpl._spaceKeyUpHandler.call(this, a), this.hasRipple() && this._ripple.uiUpAction()
        }
    }, Polymer.PaperButtonBehavior = [Polymer.IronButtonState, Polymer.IronControlState, Polymer.PaperRippleBehavior, Polymer.PaperButtonBehaviorImpl], Polymer.PaperInkyFocusBehaviorImpl = {
        observers: ["_focusedChanged(receivedFocusFromKeyboard)"],
        _focusedChanged: function(a) {
            a && this.ensureRipple(), this.hasRipple() && (this._ripple.holdDown = a)
        },
        _createRipple: function() {
            var a = Polymer.PaperRippleBehavior._createRipple();
            return a.id = "ink", a.setAttribute("center", ""), a.classList.add("circle"), a
        }
    }, Polymer.PaperInkyFocusBehavior = [Polymer.IronButtonState, Polymer.IronControlState, Polymer.PaperRippleBehavior, Polymer.PaperInkyFocusBehaviorImpl], Polymer({
        is: "iron-iconset-svg",
        properties: {
            name: {
                type: String,
                observer: "_nameChanged"
            },
            size: {
                type: Number,
                value: 24
            },
            rtlMirroring: {
                type: Boolean,
                value: !1
            }
        },
        attached: function() {
            this.style.display = "none"
        },
        getIconNames: function() {
            return this._icons = this._createIconMap(), Object.keys(this._icons).map(function(a) {
                return this.name + ":" + a
            }, this)
        },
        applyIcon: function(a, b) {
            a = a.root || a, this.removeIcon(a);
            var c = this._cloneIcon(b, this.rtlMirroring && this._targetIsRTL(a));
            if (c) {
                var d = Polymer.dom(a);
                return d.insertBefore(c, d.childNodes[0]), a._svgIcon = c
            }
            return null
        },
        removeIcon: function(a) {
            a = a.root || a, a._svgIcon && (Polymer.dom(a).removeChild(a._svgIcon), a._svgIcon = null)
        },
        _targetIsRTL: function(a) {
            return null == this.__targetIsRTL && (a && a.nodeType !== Node.ELEMENT_NODE && (a = a.host), this.__targetIsRTL = a && "rtl" === window.getComputedStyle(a).direction), this.__targetIsRTL
        },
        _nameChanged: function() {
            new Polymer.IronMeta({
                type: "iconset",
                key: this.name,
                value: this
            }), this.async(function() {
                this.fire("iron-iconset-added", this, {
                    node: window
                })
            })
        },
        _createIconMap: function() {
            var a = Object.create(null);
            return Polymer.dom(this).querySelectorAll("[id]").forEach(function(b) {
                a[b.id] = b
            }), a
        },
        _cloneIcon: function(a, b) {
            return this._icons = this._icons || this._createIconMap(), this._prepareSvgClone(this._icons[a], this.size, b)
        },
        _prepareSvgClone: function(a, b, c) {
            if (a) {
                var d = a.cloneNode(!0),
                    e = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                    f = d.getAttribute("viewBox") || "0 0 " + b + " " + b,
                    g = "pointer-events: none; display: block; width: 100%; height: 100%;";
                return c && d.hasAttribute("mirror-in-rtl") && (g += "-webkit-transform:scale(-1,1);transform:scale(-1,1);"), e.setAttribute("viewBox", f), e.setAttribute("preserveAspectRatio", "xMidYMid meet"), e.style.cssText = g, e.appendChild(d).removeAttribute("id"), e
            }
            return null
        }
    }), Polymer({
        is: "gum-handler",
        properties: {
            pending: {
                type: Boolean,
                value: !0,
                notify: !0
            },
            error: {
                type: Object,
                value: !1,
                notify: !0
            },
            getUserMedia: {
                type: Function,
                value: function() {
                    return navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices)
                }
            },
            enumerateDevices: {
                type: Function,
                value: function() {
                    return navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices)
                }
            }
        },
        ready: function() {
            "undefined" !== this.getUserMedia ? this.triggerGetUserMedia_() : this.error = "NotSupported"
        },
        triggerGetUserMedia_: function() {
            0 != this.pending && this.enumerateDevices().then(this.triggerGetUserMediaBasedOnSources_.bind(this))["catch"](function(a) {
                console.log("JS Device selection not supported", a), this.triggerGetUserMediaBasedOnSources_([])
            }.bind(this))
        },
        triggerGetUserMediaBasedOnSources_: function(a) {
            var b = {};
            if (0 === a.length) b = {
                audio: !0,
                video: !0
            };
            else
                for (var c = 0; c < a.length; c++) "audioinput" === a[c].kind && (b.audio = !0), "videoinput" === a[c].kind && (b.video = !0);
            this.getUserMedia(b).then(function(a) {
                for (var b = 0; b < a.getVideoTracks().length; b++) a.getVideoTracks()[b].stop();
                for (var c = 0; c < a.getAudioTracks().length; c++) a.getAudioTracks()[c].stop();
                this.pending = !1, this.error = !1
            }.bind(this))["catch"](function(a) {
                this.error = a, setTimeout(this.triggerGetUserMedia_.bind(this), 1e3)
            }.bind(this))
        }
    }), Polymer.IronValidatableBehaviorMeta = null, Polymer.IronValidatableBehavior = {
        properties: {
            validator: {
                type: String
            },
            invalid: {
                notify: !0,
                reflectToAttribute: !0,
                type: Boolean,
                value: !1
            },
            _validatorMeta: {
                type: Object
            },
            validatorType: {
                type: String,
                value: "validator"
            },
            _validator: {
                type: Object,
                computed: "__computeValidator(validator)"
            }
        },
        observers: ["_invalidChanged(invalid)"],
        registered: function() {
            Polymer.IronValidatableBehaviorMeta = new Polymer.IronMeta({
                type: "validator"
            })
        },
        _invalidChanged: function() {
            this.invalid ? this.setAttribute("aria-invalid", "true") : this.removeAttribute("aria-invalid")
        },
        hasValidator: function() {
            return null != this._validator
        },
        validate: function(a) {
            return this.invalid = !this._getValidity(a), !this.invalid
        },
        _getValidity: function(a) {
            return this.hasValidator() ? this._validator.validate(a) : !0;
        },
        __computeValidator: function() {
            return Polymer.IronValidatableBehaviorMeta && Polymer.IronValidatableBehaviorMeta.byKey(this.validator)
        }
    }, Polymer({
        is: "iron-input",
        "extends": "input",
        behaviors: [Polymer.IronValidatableBehavior],
        properties: {
            bindValue: {
                observer: "_bindValueChanged",
                type: String
            },
            preventInvalidInput: {
                type: Boolean
            },
            allowedPattern: {
                type: String,
                observer: "_allowedPatternChanged"
            },
            _previousValidInput: {
                type: String,
                value: ""
            },
            _patternAlreadyChecked: {
                type: Boolean,
                value: !1
            }
        },
        listeners: {
            input: "_onInput",
            keypress: "_onKeypress"
        },
        registered: function() {
            this._canDispatchEventOnDisabled() || (this._origDispatchEvent = this.dispatchEvent, this.dispatchEvent = this._dispatchEventFirefoxIE)
        },
        created: function() {
            Polymer.IronA11yAnnouncer.requestAvailability()
        },
        _canDispatchEventOnDisabled: function() {
            var a = document.createElement("input"),
                b = !1;
            a.disabled = !0, a.addEventListener("feature-check-dispatch-event", function() {
                b = !0
            });
            try {
                a.dispatchEvent(new Event("feature-check-dispatch-event"))
            } catch (c) {}
            return b
        },
        _dispatchEventFirefoxIE: function() {
            var a = this.disabled;
            this.disabled = !1, this._origDispatchEvent.apply(this, arguments), this.disabled = a
        },
        get _patternRegExp() {
            var a;
            if (this.allowedPattern) a = new RegExp(this.allowedPattern);
            else switch (this.type) {
                case "number":
                    a = /[0-9.,e-]/
            }
            return a
        },
        ready: function() {
            this.bindValue = this.value
        },
        _bindValueChanged: function() {
            this.value !== this.bindValue && (this.value = this.bindValue || 0 === this.bindValue || this.bindValue === !1 ? this.bindValue : ""), this.fire("bind-value-changed", {
                value: this.bindValue
            })
        },
        _allowedPatternChanged: function() {
            this.preventInvalidInput = !!this.allowedPattern
        },
        _onInput: function() {
            if (this.preventInvalidInput && !this._patternAlreadyChecked) {
                var a = this._checkPatternValidity();
                a || (this._announceInvalidCharacter("Invalid string of characters not entered."), this.value = this._previousValidInput)
            }
            this.bindValue = this.value, this._previousValidInput = this.value, this._patternAlreadyChecked = !1
        },
        _isPrintable: function(a) {
            var b = 8 == a.keyCode || 9 == a.keyCode || 13 == a.keyCode || 27 == a.keyCode,
                c = 19 == a.keyCode || 20 == a.keyCode || 45 == a.keyCode || 46 == a.keyCode || 144 == a.keyCode || 145 == a.keyCode || a.keyCode > 32 && a.keyCode < 41 || a.keyCode > 111 && a.keyCode < 124;
            return !(b || 0 == a.charCode && c)
        },
        _onKeypress: function(a) {
            if (this.preventInvalidInput || "number" === this.type) {
                var b = this._patternRegExp;
                if (b && !(a.metaKey || a.ctrlKey || a.altKey)) {
                    this._patternAlreadyChecked = !0;
                    var c = String.fromCharCode(a.charCode);
                    this._isPrintable(a) && !b.test(c) && (a.preventDefault(), this._announceInvalidCharacter("Invalid character " + c + " not entered."))
                }
            }
        },
        _checkPatternValidity: function() {
            var a = this._patternRegExp;
            if (!a) return !0;
            for (var b = 0; b < this.value.length; b++)
                if (!a.test(this.value[b])) return !1;
            return !0
        },
        validate: function() {
            var a = this.checkValidity();
            return a && (this.required && "" === this.value ? a = !1 : this.hasValidator() && (a = Polymer.IronValidatableBehavior.validate.call(this, this.value))), this.invalid = !a, this.fire("iron-input-validate"), a
        },
        _announceInvalidCharacter: function(a) {
            this.fire("iron-announce", {
                text: a
            })
        }
    }), Polymer.IronFormElementBehavior = {
        properties: {
            name: {
                type: String
            },
            value: {
                notify: !0,
                type: String
            },
            required: {
                type: Boolean,
                value: !1
            },
            _parentForm: {
                type: Object
            }
        },
        attached: function() {
            this.fire("iron-form-element-register")
        },
        detached: function() {
            this._parentForm && this._parentForm.fire("iron-form-element-unregister", {
                target: this
            })
        }
    }, Polymer.PaperInputBehaviorImpl = {
        properties: {
            label: {
                type: String
            },
            value: {
                notify: !0,
                type: String
            },
            disabled: {
                type: Boolean,
                value: !1
            },
            invalid: {
                type: Boolean,
                value: !1,
                notify: !0
            },
            preventInvalidInput: {
                type: Boolean
            },
            allowedPattern: {
                type: String
            },
            type: {
                type: String
            },
            list: {
                type: String
            },
            pattern: {
                type: String
            },
            required: {
                type: Boolean,
                value: !1
            },
            errorMessage: {
                type: String
            },
            charCounter: {
                type: Boolean,
                value: !1
            },
            noLabelFloat: {
                type: Boolean,
                value: !1
            },
            alwaysFloatLabel: {
                type: Boolean,
                value: !1
            },
            autoValidate: {
                type: Boolean,
                value: !1
            },
            validator: {
                type: String
            },
            autocomplete: {
                type: String,
                value: "off"
            },
            autofocus: {
                type: Boolean
            },
            inputmode: {
                type: String
            },
            minlength: {
                type: Number
            },
            maxlength: {
                type: Number
            },
            min: {
                type: String
            },
            max: {
                type: String
            },
            step: {
                type: String
            },
            name: {
                type: String
            },
            placeholder: {
                type: String,
                value: ""
            },
            readonly: {
                type: Boolean,
                value: !1
            },
            size: {
                type: Number
            },
            autocapitalize: {
                type: String,
                value: "none"
            },
            autocorrect: {
                type: String,
                value: "off"
            },
            autosave: {
                type: String
            },
            results: {
                type: Number
            },
            accept: {
                type: String
            },
            multiple: {
                type: Boolean
            },
            _ariaDescribedBy: {
                type: String,
                value: ""
            }
        },
        listeners: {
            "addon-attached": "_onAddonAttached"
        },
        observers: ["_focusedControlStateChanged(focused)"],
        get inputElement() {
            return this.$.input
        },
        attached: function() {
            this._updateAriaLabelledBy()
        },
        _appendStringWithSpace: function(a, b) {
            return a = a ? a + " " + b : b
        },
        _onAddonAttached: function(a) {
            var b = a.path ? a.path[0] : a.target;
            if (b.id) this._ariaDescribedBy = this._appendStringWithSpace(this._ariaDescribedBy, b.id);
            else {
                var c = "paper-input-add-on-" + Math.floor(1e5 * Math.random());
                b.id = c, this._ariaDescribedBy = this._appendStringWithSpace(this._ariaDescribedBy, c)
            }
        },
        validate: function() {
            return this.inputElement.validate()
        },
        _handleAutoValidate: function() {
            this.autoValidate && this.validate()
        },
        updateValueAndPreserveCaret: function(a) {
            try {
                var b = this.inputElement.selectionStart;
                this.value = a, this.inputElement.selectionStart = b, this.inputElement.selectionEnd = b
            } catch (c) {
                this.value = a
            }
        },
        _computeAlwaysFloatLabel: function(a, b) {
            return b || a
        },
        _focusedControlStateChanged: function(a) {
            (this.$.container || (this.$.container = Polymer.dom(this.root).querySelector("paper-input-container"), this.$.container)) && (a ? this.$.container._onFocus() : this.$.container._onBlur())
        },
        _updateAriaLabelledBy: function() {
            var a = Polymer.dom(this.root).querySelector("label");
            if (!a) return void(this._ariaLabelledBy = "");
            var b;
            a.id ? b = a.id : (b = "paper-input-label-" + (new Date).getUTCMilliseconds(), a.id = b), this._ariaLabelledBy = b
        },
        _onChange: function(a) {
            this.shadowRoot && this.fire(a.type, {
                sourceEvent: a
            }, {
                node: this,
                bubbles: a.bubbles,
                cancelable: a.cancelable
            })
        }
    }, Polymer.PaperInputBehavior = [Polymer.IronControlState, Polymer.PaperInputBehaviorImpl], Polymer.PaperInputAddonBehavior = {
        hostAttributes: {
            "add-on": ""
        },
        attached: function() {
            this.fire("addon-attached")
        },
        update: function(a) {}
    }, Report.prototype = {
        traceEventInstant: function(a, b) {
            this.output_.push({
                ts: Date.now(),
                name: a,
                args: b
            })
        },
        traceEventWithId: function(a, b, c) {
            this.output_.push({
                ts: Date.now(),
                name: a,
                id: b,
                args: c
            })
        },
        traceEventAsync: function(a) {
            return this.traceEventWithId.bind(this, a, this.nextAsyncId_++)
        },
        logTestRunResult: function(a, b) {
            ga("send", {
                hitType: "event",
                eventCategory: "Test",
                eventAction: b,
                eventLabel: a,
                nonInteraction: 1
            })
        },
        generate: function(a) {
            var b = {
                title: "WebRTC Troubleshooter bug report",
                description: a || null
            };
            return this.getContent_(b)
        },
        getContent_: function(a) {
            var b = [];
            return this.appendEventsAsString_([a] || [], b), this.appendEventsAsString_(this.output_, b), "[" + b.join(",\n") + "]"
        },
        appendEventsAsString_: function(a, b) {
            for (var c = 0; c !== a.length; ++c) b.push(JSON.stringify(a[c]))
        },
        onWindowError_: function(a) {
            this.traceEventInstant("error", {
                message: a.message,
                filename: a.filename + ":" + a.lineno
            })
        },
        logHook_: function() {
            this.traceEventInstant("log", arguments), this.nativeLog_.apply(null, arguments)
        }
    }, Report.getSystemInfo = function() {
        var a, b, c, d = navigator.userAgent,
            e = navigator.appName,
            f = "" + parseFloat(navigator.appVersion);
        return -1 !== (b = d.indexOf("Chrome")) ? (e = "Chrome", f = d.substring(b + 7)) : -1 !== (b = d.indexOf("MSIE")) ? (e = "Microsoft Internet Explorer", f = d.substring(b + 5)) : -1 !== (b = d.indexOf("Trident")) ? (e = "Microsoft Internet Explorer", f = d.substring(b + 8)) : -1 !== (b = d.indexOf("Firefox")) ? e = "Firefox" : -1 !== (b = d.indexOf("Safari")) ? (e = "Safari", f = d.substring(b + 7), -1 !== (b = d.indexOf("Version")) && (f = d.substring(b + 8))) : (a = d.lastIndexOf(" ") + 1) < (b = d.lastIndexOf("/")) && (e = d.substring(a, b), f = d.substring(b + 1), e.toLowerCase() === e.toUpperCase() && (e = navigator.appName)), -1 !== (c = f.indexOf(";")) && (f = f.substring(0, c)), -1 !== (c = f.indexOf(" ")) && (f = f.substring(0, c)), {
            browserName: e,
            browserVersion: f,
            platform: navigator.platform
        }
    };
var report = new Report;
! function() {
    "use strict";

    function a(a) {
        var b = [];
        for (var c in a) a.hasOwnProperty(c) && a[c] && b.push(c);
        return b.join(" ")
    }
    Polymer({
        is: "paper-toolbar",
        hostAttributes: {
            role: "toolbar"
        },
        properties: {
            bottomJustify: {
                type: String,
                value: ""
            },
            justify: {
                type: String,
                value: ""
            },
            middleJustify: {
                type: String,
                value: ""
            }
        },
        attached: function() {
            this._observer = this._observe(this), this._updateAriaLabelledBy()
        },
        detached: function() {
            this._observer && this._observer.disconnect()
        },
        _observe: function(a) {
            var b = new MutationObserver(function() {
                this._updateAriaLabelledBy()
            }.bind(this));
            return b.observe(a, {
                childList: !0,
                subtree: !0
            }), b
        },
        _updateAriaLabelledBy: function() {
            for (var a, b = [], c = Polymer.dom(this.root).querySelectorAll("content"), d = 0; a = c[d]; d++)
                for (var e, f = Polymer.dom(a).getDistributedNodes(), g = 0; e = f[g]; g++)
                    if (e.classList && e.classList.contains("title"))
                        if (e.id) b.push(e.id);
                        else {
                            var h = "paper-toolbar-label-" + Math.floor(1e4 * Math.random());
                            e.id = h, b.push(h)
                        }
            b.length > 0 && this.setAttribute("aria-labelledby", b.join(" "))
        },
        _computeBarClassName: function(b) {
            var c = {
                center: !0,
                horizontal: !0,
                layout: !0,
                "toolbar-tools": !0
            };
            if (b) {
                var d = "justified" === b ? b : b + "-justified";
                c[d] = !0
            }
            return a(c)
        }
    })
}(),
function() {
    "use strict";
    Polymer({
        is: "iron-overlay-backdrop",
        properties: {
            opened: {
                reflectToAttribute: !0,
                type: Boolean,
                value: !1,
                observer: "_openedChanged"
            }
        },
        listeners: {
            transitionend: "_onTransitionend"
        },
        created: function() {
            this.__openedRaf = null
        },
        attached: function() {
            this.opened && this._openedChanged(this.opened)
        },
        prepare: function() {
            this.opened && !this.parentNode && Polymer.dom(document.body).appendChild(this)
        },
        open: function() {
            this.opened = !0
        },
        close: function() {
            this.opened = !1
        },
        complete: function() {
            this.opened || this.parentNode !== document.body || Polymer.dom(this.parentNode).removeChild(this)
        },
        _onTransitionend: function(a) {
            a && a.target === this && this.complete()
        },
        _openedChanged: function(a) {
            if (a) this.prepare();
            else {
                var b = window.getComputedStyle(this);
                "0s" !== b.transitionDuration && 0 != b.opacity || this.complete()
            }
            this.isAttached && (this.__openedRaf && (window.cancelAnimationFrame(this.__openedRaf), this.__openedRaf = null), this.scrollTop = this.scrollTop, this.__openedRaf = window.requestAnimationFrame(function() {
                this.__openedRaf = null, this.toggleClass("opened", this.opened)
            }.bind(this)))
        }
    })
}(),
function() {
    Polymer({
        is: "paper-dialog",
        behaviors: [Polymer.PaperDialogBehavior, Polymer.NeonAnimationRunnerBehavior],
        listeners: {
            "neon-animation-finish": "_onNeonAnimationFinish"
        },
        _renderOpened: function() {
            this.cancelAnimation(), this.withBackdrop && this.backdropElement.open(), this.playAnimation("entry")
        },
        _renderClosed: function() {
            this.cancelAnimation(), this.withBackdrop && this.backdropElement.close(), this.playAnimation("exit")
        },
        _onNeonAnimationFinish: function() {
            this.opened ? this._finishRenderOpened() : this._finishRenderClosed()
        }
    })
}(), Polymer({
        is: "paper-progress",
        behaviors: [Polymer.IronRangeBehavior],
        properties: {
            secondaryProgress: {
                type: Number,
                value: 0
            },
            secondaryRatio: {
                type: Number,
                value: 0,
                readOnly: !0
            },
            indeterminate: {
                type: Boolean,
                value: !1,
                observer: "_toggleIndeterminate"
            },
            disabled: {
                type: Boolean,
                value: !1,
                reflectToAttribute: !0,
                observer: "_disabledChanged"
            }
        },
        observers: ["_progressChanged(secondaryProgress, value, min, max)"],
        hostAttributes: {
            role: "progressbar"
        },
        _toggleIndeterminate: function(a) {
            this.toggleClass("indeterminate", a, this.$.primaryProgress)
        },
        _transformProgress: function(a, b) {
            var c = "scaleX(" + b / 100 + ")";
            a.style.transform = a.style.webkitTransform = c
        },
        _mainRatioChanged: function(a) {
            this._transformProgress(this.$.primaryProgress, a)
        },
        _progressChanged: function(a, b, c, d) {
            a = this._clampValue(a), b = this._clampValue(b);
            var e = 100 * this._calcRatio(a),
                f = 100 * this._calcRatio(b);
            this._setSecondaryRatio(e), this._transformProgress(this.$.secondaryProgress, e), this._transformProgress(this.$.primaryProgress, f), this.secondaryProgress = a, this.setAttribute("aria-valuenow", b), this.setAttribute("aria-valuemin", c), this.setAttribute("aria-valuemax", d)
        },
        _disabledChanged: function(a) {
            this.setAttribute("aria-disabled", a ? "true" : "false")
        },
        _hideSecondaryProgress: function(a) {
            return 0 === a
        }
    }),
    function() {
        function a(a) {
            this.element = a, this.width = this.boundingRect.width, this.height = this.boundingRect.height, this.size = Math.max(this.width, this.height)
        }

        function b(a) {
            this.element = a, this.color = window.getComputedStyle(a).color, this.wave = document.createElement("div"), this.waveContainer = document.createElement("div"), this.wave.style.backgroundColor = this.color, this.wave.classList.add("wave"), this.waveContainer.classList.add("wave-container"), Polymer.dom(this.waveContainer).appendChild(this.wave), this.resetInteractionState()
        }
        var c = {
            distance: function(a, b, c, d) {
                var e = a - c,
                    f = b - d;
                return Math.sqrt(e * e + f * f)
            },
            now: window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now
        };
        a.prototype = {
            get boundingRect() {
                return this.element.getBoundingClientRect()
            },
            furthestCornerDistanceFrom: function(a, b) {
                var d = c.distance(a, b, 0, 0),
                    e = c.distance(a, b, this.width, 0),
                    f = c.distance(a, b, 0, this.height),
                    g = c.distance(a, b, this.width, this.height);
                return Math.max(d, e, f, g)
            }
        }, b.MAX_RADIUS = 300, b.prototype = {
            get recenters() {
                return this.element.recenters
            },
            get center() {
                return this.element.center
            },
            get mouseDownElapsed() {
                var a;
                return this.mouseDownStart ? (a = c.now() - this.mouseDownStart, this.mouseUpStart && (a -= this.mouseUpElapsed), a) : 0
            },
            get mouseUpElapsed() {
                return this.mouseUpStart ? c.now() - this.mouseUpStart : 0
            },
            get mouseDownElapsedSeconds() {
                return this.mouseDownElapsed / 1e3
            },
            get mouseUpElapsedSeconds() {
                return this.mouseUpElapsed / 1e3
            },
            get mouseInteractionSeconds() {
                return this.mouseDownElapsedSeconds + this.mouseUpElapsedSeconds
            },
            get initialOpacity() {
                return this.element.initialOpacity
            },
            get opacityDecayVelocity() {
                return this.element.opacityDecayVelocity
            },
            get radius() {
                var a = this.containerMetrics.width * this.containerMetrics.width,
                    c = this.containerMetrics.height * this.containerMetrics.height,
                    d = 1.1 * Math.min(Math.sqrt(a + c), b.MAX_RADIUS) + 5,
                    e = 1.1 - .2 * (d / b.MAX_RADIUS),
                    f = this.mouseInteractionSeconds / e,
                    g = d * (1 - Math.pow(80, -f));
                return Math.abs(g)
            },
            get opacity() {
                return this.mouseUpStart ? Math.max(0, this.initialOpacity - this.mouseUpElapsedSeconds * this.opacityDecayVelocity) : this.initialOpacity
            },
            get outerOpacity() {
                var a = .3 * this.mouseUpElapsedSeconds,
                    b = this.opacity;
                return Math.max(0, Math.min(a, b))
            },
            get isOpacityFullyDecayed() {
                return this.opacity < .01 && this.radius >= Math.min(this.maxRadius, b.MAX_RADIUS)
            },
            get isRestingAtMaxRadius() {
                return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, b.MAX_RADIUS)
            },
            get isAnimationComplete() {
                return this.mouseUpStart ? this.isOpacityFullyDecayed : this.isRestingAtMaxRadius
            },
            get translationFraction() {
                return Math.min(1, this.radius / this.containerMetrics.size * 2 / Math.sqrt(2))
            },
            get xNow() {
                return this.xEnd ? this.xStart + this.translationFraction * (this.xEnd - this.xStart) : this.xStart
            },
            get yNow() {
                return this.yEnd ? this.yStart + this.translationFraction * (this.yEnd - this.yStart) : this.yStart
            },
            get isMouseDown() {
                return this.mouseDownStart && !this.mouseUpStart
            },
            resetInteractionState: function() {
                this.maxRadius = 0, this.mouseDownStart = 0, this.mouseUpStart = 0, this.xStart = 0, this.yStart = 0, this.xEnd = 0, this.yEnd = 0, this.slideDistance = 0, this.containerMetrics = new a(this.element)
            },
            draw: function() {
                var a, b, c;
                this.wave.style.opacity = this.opacity, a = this.radius / (this.containerMetrics.size / 2), b = this.xNow - this.containerMetrics.width / 2, c = this.yNow - this.containerMetrics.height / 2, this.waveContainer.style.webkitTransform = "translate(" + b + "px, " + c + "px)", this.waveContainer.style.transform = "translate3d(" + b + "px, " + c + "px, 0)", this.wave.style.webkitTransform = "scale(" + a + "," + a + ")", this.wave.style.transform = "scale3d(" + a + "," + a + ",1)"
            },
            downAction: function(a) {
                var b = this.containerMetrics.width / 2,
                    d = this.containerMetrics.height / 2;
                this.resetInteractionState(), this.mouseDownStart = c.now(), this.center ? (this.xStart = b, this.yStart = d, this.slideDistance = c.distance(this.xStart, this.yStart, this.xEnd, this.yEnd)) : (this.xStart = a ? a.detail.x - this.containerMetrics.boundingRect.left : this.containerMetrics.width / 2, this.yStart = a ? a.detail.y - this.containerMetrics.boundingRect.top : this.containerMetrics.height / 2), this.recenters && (this.xEnd = b, this.yEnd = d, this.slideDistance = c.distance(this.xStart, this.yStart, this.xEnd, this.yEnd)), this.maxRadius = this.containerMetrics.furthestCornerDistanceFrom(this.xStart, this.yStart), this.waveContainer.style.top = (this.containerMetrics.height - this.containerMetrics.size) / 2 + "px", this.waveContainer.style.left = (this.containerMetrics.width - this.containerMetrics.size) / 2 + "px", this.waveContainer.style.width = this.containerMetrics.size + "px", this.waveContainer.style.height = this.containerMetrics.size + "px"
            },
            upAction: function(a) {
                this.isMouseDown && (this.mouseUpStart = c.now())
            },
            remove: function() {
                Polymer.dom(this.waveContainer.parentNode).removeChild(this.waveContainer)
            }
        }, Polymer({
            is: "paper-ripple",
            behaviors: [Polymer.IronA11yKeysBehavior],
            properties: {
                initialOpacity: {
                    type: Number,
                    value: .25
                },
                opacityDecayVelocity: {
                    type: Number,
                    value: .8
                },
                recenters: {
                    type: Boolean,
                    value: !1
                },
                center: {
                    type: Boolean,
                    value: !1
                },
                ripples: {
                    type: Array,
                    value: function() {
                        return []
                    }
                },
                animating: {
                    type: Boolean,
                    readOnly: !0,
                    reflectToAttribute: !0,
                    value: !1
                },
                holdDown: {
                    type: Boolean,
                    value: !1,
                    observer: "_holdDownChanged"
                },
                noink: {
                    type: Boolean,
                    value: !1
                },
                _animating: {
                    type: Boolean
                },
                _boundAnimate: {
                    type: Function,
                    value: function() {
                        return this.animate.bind(this)
                    }
                }
            },
            get target() {
                return this.keyEventTarget
            },
            keyBindings: {
                "enter:keydown": "_onEnterKeydown",
                "space:keydown": "_onSpaceKeydown",
                "space:keyup": "_onSpaceKeyup"
            },
            attached: function() {
                11 == this.parentNode.nodeType ? this.keyEventTarget = Polymer.dom(this).getOwnerRoot().host : this.keyEventTarget = this.parentNode;
                var a = this.keyEventTarget;
                this.listen(a, "up", "uiUpAction"), this.listen(a, "down", "uiDownAction")
            },
            detached: function() {
                this.unlisten(this.keyEventTarget, "up", "uiUpAction"), this.unlisten(this.keyEventTarget, "down", "uiDownAction"), this.keyEventTarget = null
            },
            get shouldKeepAnimating() {
                for (var a = 0; a < this.ripples.length; ++a)
                    if (!this.ripples[a].isAnimationComplete) return !0;
                return !1
            },
            simulatedRipple: function() {
                this.downAction(null), this.async(function() {
                    this.upAction()
                }, 1)
            },
            uiDownAction: function(a) {
                this.noink || this.downAction(a)
            },
            downAction: function(a) {
                if (!(this.holdDown && this.ripples.length > 0)) {
                    var b = this.addRipple();
                    b.downAction(a), this._animating || (this._animating = !0, this.animate())
                }
            },
            uiUpAction: function(a) {
                this.noink || this.upAction(a)
            },
            upAction: function(a) {
                this.holdDown || (this.ripples.forEach(function(b) {
                    b.upAction(a)
                }), this._animating = !0, this.animate())
            },
            onAnimationComplete: function() {
                this._animating = !1, this.$.background.style.backgroundColor = null, this.fire("transitionend")
            },
            addRipple: function() {
                var a = new b(this);
                return Polymer.dom(this.$.waves).appendChild(a.waveContainer), this.$.background.style.backgroundColor = a.color, this.ripples.push(a), this._setAnimating(!0), a
            },
            removeRipple: function(a) {
                var b = this.ripples.indexOf(a);
                0 > b || (this.ripples.splice(b, 1), a.remove(), this.ripples.length || this._setAnimating(!1))
            },
            animate: function() {
                if (this._animating) {
                    var a, b;
                    for (a = 0; a < this.ripples.length; ++a) b = this.ripples[a], b.draw(), this.$.background.style.opacity = b.outerOpacity, b.isOpacityFullyDecayed && !b.isRestingAtMaxRadius && this.removeRipple(b);
                    this.shouldKeepAnimating || 0 !== this.ripples.length ? window.requestAnimationFrame(this._boundAnimate) : this.onAnimationComplete()
                }
            },
            _onEnterKeydown: function() {
                this.uiDownAction(), this.async(this.uiUpAction, 1)
            },
            _onSpaceKeydown: function() {
                this.uiDownAction()
            },
            _onSpaceKeyup: function() {
                this.uiUpAction()
            },
            _holdDownChanged: function(a, b) {
                void 0 !== b && (a ? this.downAction() : this.upAction())
            }
        })
    }(), Polymer({
        is: "paper-button",
        behaviors: [Polymer.PaperButtonBehavior],
        properties: {
            raised: {
                type: Boolean,
                reflectToAttribute: !0,
                value: !1,
                observer: "_calculateElevation"
            }
        },
        _calculateElevation: function() {
            this.raised ? Polymer.PaperButtonBehaviorImpl._calculateElevation.apply(this) : this._setElevation(0)
        }
    }), Polymer({
        is: "iron-icon",
        properties: {
            icon: {
                type: String
            },
            theme: {
                type: String
            },
            src: {
                type: String
            },
            _meta: {
                value: Polymer.Base.create("iron-meta", {
                    type: "iconset"
                })
            }
        },
        observers: ["_updateIcon(_meta, isAttached)", "_updateIcon(theme, isAttached)", "_srcChanged(src, isAttached)", "_iconChanged(icon, isAttached)"],
        _DEFAULT_ICONSET: "icons",
        _iconChanged: function(a) {
            var b = (a || "").split(":");
            this._iconName = b.pop(), this._iconsetName = b.pop() || this._DEFAULT_ICONSET, this._updateIcon()
        },
        _srcChanged: function(a) {
            this._updateIcon()
        },
        _usesIconset: function() {
            return this.icon || !this.src
        },
        _updateIcon: function() {
            this._usesIconset() ? (this._img && this._img.parentNode && Polymer.dom(this.root).removeChild(this._img), "" === this._iconName ? this._iconset && this._iconset.removeIcon(this) : this._iconsetName && this._meta && (this._iconset = this._meta.byKey(this._iconsetName), this._iconset ? (this._iconset.applyIcon(this, this._iconName, this.theme), this.unlisten(window, "iron-iconset-added", "_updateIcon")) : this.listen(window, "iron-iconset-added", "_updateIcon"))) : (this._iconset && this._iconset.removeIcon(this), this._img || (this._img = document.createElement("img"), this._img.style.width = "100%", this._img.style.height = "100%", this._img.draggable = !1), this._img.src = this.src, Polymer.dom(this.root).appendChild(this._img))
        }
    }), Polymer({
        is: "paper-icon-button",
        hostAttributes: {
            role: "button",
            tabindex: "0"
        },
        behaviors: [Polymer.PaperInkyFocusBehavior],
        properties: {
            src: {
                type: String
            },
            icon: {
                type: String
            },
            alt: {
                type: String,
                observer: "_altChanged"
            }
        },
        _altChanged: function(a, b) {
            var c = this.getAttribute("aria-label");
            c && b != c || this.setAttribute("aria-label", a)
        }
    }), Polymer({
        is: "iron-collapse",
        behaviors: [Polymer.IronResizableBehavior],
        properties: {
            horizontal: {
                type: Boolean,
                value: !1,
                observer: "_horizontalChanged"
            },
            opened: {
                type: Boolean,
                value: !1,
                notify: !0,
                observer: "_openedChanged"
            },
            noAnimation: {
                type: Boolean
            }
        },
        get dimension() {
            return this.horizontal ? "width" : "height"
        },
        hostAttributes: {
            role: "group",
            "aria-hidden": "true",
            "aria-expanded": "false"
        },
        listeners: {
            transitionend: "_transitionEnd"
        },
        attached: function() {
            this._transitionEnd()
        },
        toggle: function() {
            this.opened = !this.opened
        },
        show: function() {
            this.opened = !0
        },
        hide: function() {
            this.opened = !1
        },
        updateSize: function(a, b) {
            if (this.style[this.dimension] !== a) {
                if (this._updateTransition(!1), b && !this.noAnimation && this._isDisplayed) {
                    var c = this._calcSize();
                    "auto" === a && (this.style[this.dimension] = a, a = this._calcSize()), this.style[this.dimension] = c, this.offsetHeight = this.offsetHeight, this._updateTransition(!0)
                }
                this.style[this.dimension] = a
            }
        },
        enableTransition: function(a) {
            console.warn("`enableTransition()` is deprecated, use `noAnimation` instead."), this.noAnimation = !a
        },
        _updateTransition: function(a) {
            this.style.transitionDuration = a && !this.noAnimation ? "" : "0s"
        },
        _horizontalChanged: function() {
            this.style.transitionProperty = this.dimension;
            var a = "width" === this.dimension ? "height" : "width";
            this.style[a] = "", this.updateSize(this.opened ? "auto" : "0px", !1)
        },
        _openedChanged: function() {
            this.setAttribute("aria-expanded", this.opened), this.setAttribute("aria-hidden", !this.opened), this.toggleClass("iron-collapse-closed", !1), this.toggleClass("iron-collapse-opened", !1), this.updateSize(this.opened ? "auto" : "0px", !0), this.opened && this.focus(), this.noAnimation && this._transitionEnd()
        },
        _transitionEnd: function() {
            this.opened && (this.style[this.dimension] = "auto"), this.toggleClass("iron-collapse-closed", !this.opened), this.toggleClass("iron-collapse-opened", this.opened), this._updateTransition(!1), this.notifyResize()
        },
        get _isDisplayed() {
            var a = this.getBoundingClientRect();
            for (var b in a)
                if (0 !== a[b]) return !0;
            return !1
        },
        _calcSize: function() {
            return this.getBoundingClientRect()[this.dimension] + "px"
        }
    }), Polymer({
        is: "testrtc-suite",
        properties: {
            state: {
                value: "pending",
                reflectToAttribute: !0
            },
            tests: {
                type: Array,
                value: function() {
                    return []
                }
            }
        },
        _iconForState: function(a) {
            return "failure" === a ? "close" : "warning" === a ? "warning" : "success" === a ? "check" : "running" === a ? "more-horiz" : ""
        },
        toggle: function() {
            this.$.collapse.toggle()
        },
        addTest: function(a, b) {
            var c = document.createElement("testrtc-test");
            c.name = a, c.testFunction = b, Polymer.dom(this.$.collapse).appendChild(c), this.tests.push(c)
        },
        run: function(a) {
            this.opened = !0, this.state = "running", runAllSequentially(this.tests, this.allTestsFinished.bind(this, a))
        },
        allTestsFinished: function(a) {
            for (var b = 0, c = 0, d = 0, e = 0; e !== this.tests.length; ++e) b += this.tests[e].errorCount, c += this.tests[e].warningCount, d += this.tests[e].successCount;
            0 === b && 0 === c && d > 0 ? (this.state = "success", this.opened = !1) : 0 === b && c > 0 ? (this.state = "warning", this.opened = !0) : (this.state = "failure", this.opened = !0), a()
        }
    });
var interval = 0;
Polymer({
    is: "line-chart",
    x: [],
    y: [],
    yScale: [0, 600],
    yLabels: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
    xStart: null,
    xOffset: null,
    lastSlowRender: null,
    addDatapoint: function(a, b) {
        var c = window.performance.now();
        this.ctx = this.$.canvas.getContext("2d");
        var d = this.x.length;
        this.x.push(a / 100 * 2), this.y.push(this.calculateY(b));
        var e = this.x[d] - this.xStart;
        if (null === this.xStart || e > this.$.canvas.width) this.setupChart(), this.xStart = this.x[d] - this.xOffset;
        else {
            var f = this.x[d - 1] - this.xStart;
            this.ctx.save(), this.ctx.beginPath(), this.ctx.fillStyle = this.dotColor(this.y[d - 1]), this.ctx.fillRect(f - 1.5, this.y[d - 1] - 1.5, 3, 3), this.ctx.moveTo(f, this.y[d - 1]), this.ctx.lineTo(e, this.y[d]), this.ctx.stroke(), this.ctx.closePath(), this.ctx.restore()
        }
        var g = window.performance.now();
        this.maybeAlertAboutRenderPerformance(g - c)
    },
    maybeAlertAboutRenderPerformance: function(a) {
        if (!(5 > a)) {
            var b = window.performance.now();
            (null === this.lastSlowRender || b - this.lastSlowRender > 5e3) && (this.lastSlowRender = b, console.log("Updating the graph was slow and might affect results. Graph update took " + a + " ms"))
        }
    },
    setupChart: function() {
        this.ctx.clearRect(0, 0, this.$.canvas.width, this.$.canvas.height), this.ctx.lineWidth = window.devicePixelRatio, this.ctx.strokeStyle = "grey", this.ctx.save(), this.ctx.lineWidth = window.devicePixelRatio, this.ctx.strokeStyle = "lightgray", this.ctx.lineWidth % 2 && this.ctx.translate(.5, .5), this.ctx.textAlign = "right", this.ctx.textBaseline = "middle", this.ctx.beginPath(), this.xOffset = 0;
        for (var a = 0; a != this.yLabels.length; a++) {
            var b = this.yLabels[a] + " ms ",
                c = this.ctx.measureText(b).width;
            this.xOffset = Math.max(this.xOffset, c)
        }
        for (var a = 0; a != this.yLabels.length; a++) {
            var d = this.calculateY(this.yLabels[a]);
            this.ctx.moveTo(this.xOffset - 3, d), a % 2 == 1 ? this.ctx.lineTo(this.xOffset + 3, d) : this.ctx.lineTo(this.$.canvas.width, d)
        }
        var e = this.calculateY(this.yLabels[this.yLabels.length - 1]),
            f = this.calculateY(0);
        this.ctx.moveTo(this.xOffset, e), this.ctx.lineTo(this.xOffset, f), this.ctx.lineTo(this.$.canvas.width - 1, f), this.ctx.lineTo(this.$.canvas.width - 1, e), this.ctx.stroke(), this.ctx.closePath();
        for (var a = 0; a != this.yLabels.length; a++) {
            var d = this.calculateY(this.yLabels[a]);
            a % 2 == 0 && this.ctx.fillText(this.yLabels[a] + " ms ", this.xOffset, d)
        }
        this.ctx.restore()
    },
    dotColor: function(a) {
        return 300 > a ? "green" : "red"
    },
    calculateY: function(a) {
        a > this.yScale[1] && (a = this.yScale[1] - 10);
        var b = (a - this.yScale[0]) / (this.yScale[1] - this.yScale[0]);
        return this.$.canvas.height * (1 - b) - 5
    }
});
var PREFIX_INFO = "[   INFO ]",
    PREFIX_OK = "[     OK ]",
    PREFIX_FAILED = "[ FAILED ]",
    PREFIX_WARNING = "[   WARN ]";
Polymer({
    is: "testrtc-test",
    properties: {
        name: {
            type: String
        },
        testFunction: {
            type: Function
        },
        settings: {
            type: Object,
            value: function() {
                return {}
            }
        },
        state: {
            value: "unknown",
            reflectToAttribute: !0
        },
        progressValue: {
            value: null
        },
        output: {
            type: Array,
            value: function() {
                return []
            }
        }
    },
    ready: function() {
        this.reportMessage_(PREFIX_INFO, "Test not run yet.")
    },
    _inProgress: function(a) {
        return null !== a
    },
    _iconForState: function(a) {
        return "running" === a ? "more-horiz" : "success" === a ? "check" : "warning" === a ? "warning" : "failure" === a ? "close" : ""
    },
    toggle: function() {
        this.$.collapse.toggle()
    },
    run: function(a) {
        this.settings = document.getElementsByTagName("testrtc-main")[0].settings, this.successCount = 0, this.warningCount = 0, this.errorCount = 0, this.doneCallback_ = a, this.output = [], this.clearPlots(), this.setProgress(null), this.traceTestEvent = report.traceEventAsync("test-run"), currentTest = this, this.state = "running", this.traceTestEvent({
            name: this.name,
            status: this.state
        }), this.isDisabled ? (this.reportInfo("Test is disabled."), this.done()) : this.testFunction(this)
    },
    done: function() {
        if ("running" === this.state) {
            this.setProgress(null);
            var a = this.errorCount + this.warningCount === 0 && this.successCount > 0;
            a ? this.state = "success" : this.warningCount > 0 && 0 === this.errorCount ? this.state = "warning" : this.isDisabled ? this.state = "disabled" : this.state = "failure", this.traceTestEvent({
                status: this.state
            }), report.logTestRunResult(this.name, this.state), this.doneCallback_()
        }
    },
    setProgress: function(a) {
        this.progressValue = a
    },
    expectEquals: function(a, b, c, d) {
        a !== b ? this.reportError("Failed expectation: " + a + " !== " + b + ": " + c) : d && this.reportSuccess(d)
    },
    reportSuccess: function(a) {
        this.reportMessage_(PREFIX_OK, a), this.successCount++, this.traceTestEvent({
            success: a
        })
    },
    reportError: function(a) {
        this.reportMessage_(PREFIX_FAILED, a), this.errorCount++, this.traceTestEvent({
            error: a
        })
    },
    reportWarning: function(a) {
        this.reportMessage_(PREFIX_WARNING, a), this.warningCount++, this.traceTestEvent({
            warning: a
        })
    },
    reportInfo: function(a) {
        this.reportMessage_(PREFIX_INFO, a), this.traceTestEvent({
            info: a
        })
    },
    reportFatal: function(a) {
        this.reportError(a), this.done()
    },
    reportMessage_: function(a, b) {
        this.output = [].concat(this.output, [{
            prefix: a,
            message: b
        }])
    },
    clearPlots: function() {
        for (; null !== this.$.plot.lastElementChild;) Polymer.dom(this.$.plot).removeChild(this.$.plot.lastElementChild)
    },
    createLineChart: function() {
        var a = document.createElement("line-chart");
        return Polymer.dom(this.$.plot).appendChild(a), this.$.collapse.opened = !0, a
    }
});
var currentTest;
Polymer({
        is: "gum-dialog",
        ready: function() {
            setTimeout(this.$.dialog.refit.bind(this.$.dialog), 0)
        },
        _createBugReport: function() {
            this.fire("bug-report")
        },
        _isNotSupported: function(a) {
            return "NotSupported" === a
        },
        _isPermissionDenied: function(a) {
            return "PermissionDeniedError" === a
        },
        _isDevicesNotFound: function(a) {
            return "DevicesNotFoundError" === a
        },
        properties: {
            pending: {
                type: Boolean,
                notify: !0
            },
            heading: {
                type: String
            }
        }
    }),
    function() {
        "use strict";
        Polymer.IronA11yAnnouncer = Polymer({
            is: "iron-a11y-announcer",
            properties: {
                mode: {
                    type: String,
                    value: "polite"
                },
                _text: {
                    type: String,
                    value: ""
                }
            },
            created: function() {
                Polymer.IronA11yAnnouncer.instance || (Polymer.IronA11yAnnouncer.instance = this), document.body.addEventListener("iron-announce", this._onIronAnnounce.bind(this))
            },
            announce: function(a) {
                this._text = "", this.async(function() {
                    this._text = a
                }, 100)
            },
            _onIronAnnounce: function(a) {
                a.detail && a.detail.text && this.announce(a.detail.text)
            }
        }), Polymer.IronA11yAnnouncer.instance = null, Polymer.IronA11yAnnouncer.requestAvailability = function() {
            Polymer.IronA11yAnnouncer.instance || (Polymer.IronA11yAnnouncer.instance = document.createElement("iron-a11y-announcer")), document.body.appendChild(Polymer.IronA11yAnnouncer.instance)
        }
    }(), Polymer({
        is: "paper-input-container",
        properties: {
            noLabelFloat: {
                type: Boolean,
                value: !1
            },
            alwaysFloatLabel: {
                type: Boolean,
                value: !1
            },
            attrForValue: {
                type: String,
                value: "bind-value"
            },
            autoValidate: {
                type: Boolean,
                value: !1
            },
            invalid: {
                observer: "_invalidChanged",
                type: Boolean,
                value: !1
            },
            focused: {
                readOnly: !0,
                type: Boolean,
                value: !1,
                notify: !0
            },
            _addons: {
                type: Array
            },
            _inputHasContent: {
                type: Boolean,
                value: !1
            },
            _inputSelector: {
                type: String,
                value: "input,textarea,.paper-input-input"
            },
            _boundOnFocus: {
                type: Function,
                value: function() {
                    return this._onFocus.bind(this)
                }
            },
            _boundOnBlur: {
                type: Function,
                value: function() {
                    return this._onBlur.bind(this)
                }
            },
            _boundOnInput: {
                type: Function,
                value: function() {
                    return this._onInput.bind(this)
                }
            },
            _boundValueChanged: {
                type: Function,
                value: function() {
                    return this._onValueChanged.bind(this)
                }
            }
        },
        listeners: {
            "addon-attached": "_onAddonAttached",
            "iron-input-validate": "_onIronInputValidate"
        },
        get _valueChangedEvent() {
            return this.attrForValue + "-changed"
        },
        get _propertyForValue() {
            return Polymer.CaseMap.dashToCamelCase(this.attrForValue)
        },
        get _inputElement() {
            return Polymer.dom(this).querySelector(this._inputSelector)
        },
        get _inputElementValue() {
            return this._inputElement[this._propertyForValue] || this._inputElement.value
        },
        ready: function() {
            this._addons || (this._addons = []), this.addEventListener("focus", this._boundOnFocus, !0), this.addEventListener("blur", this._boundOnBlur, !0), this.attrForValue ? this._inputElement.addEventListener(this._valueChangedEvent, this._boundValueChanged) : this.addEventListener("input", this._onInput)
        },
        attached: function() {
            "" != this._inputElementValue ? this._handleValueAndAutoValidate(this._inputElement) : this._handleValue(this._inputElement), this._numberOfPrefixNodes = 0, this._prefixObserver = Polymer.dom(this.$.prefix).observeNodes(function(a) {
                this._numberOfPrefixNodes += a.addedNodes.length - a.removedNodes.length
            }.bind(this))
        },
        detached: function() {
            this._prefixObserver && Polymer.dom(this.$.prefix).unobserveNodes(this._prefixObserver)
        },
        _onAddonAttached: function(a) {
            this._addons || (this._addons = []);
            var b = a.target; - 1 === this._addons.indexOf(b) && (this._addons.push(b), this.isAttached && this._handleValue(this._inputElement))
        },
        _onFocus: function() {
            this._setFocused(!0)
        },
        _onBlur: function() {
            this._setFocused(!1), this._handleValueAndAutoValidate(this._inputElement)
        },
        _onInput: function(a) {
            this._handleValueAndAutoValidate(a.target)
        },
        _onValueChanged: function(a) {
            this._handleValueAndAutoValidate(a.target)
        },
        _handleValue: function(a) {
            var b = this._inputElementValue;
            b || 0 === b || "number" === a.type && !a.checkValidity() ? this._inputHasContent = !0 : this._inputHasContent = !1, this.updateAddons({
                inputElement: a,
                value: b,
                invalid: this.invalid
            })
        },
        _handleValueAndAutoValidate: function(a) {
            if (this.autoValidate) {
                var b;
                b = a.validate ? a.validate(this._inputElementValue) : a.checkValidity(), this.invalid = !b
            }
            this._handleValue(a)
        },
        _onIronInputValidate: function(a) {
            this.invalid = this._inputElement.invalid
        },
        _invalidChanged: function() {
            this._addons && this.updateAddons({
                invalid: this.invalid
            })
        },
        updateAddons: function(a) {
            for (var b, c = 0; b = this._addons[c]; c++) b.update(a)
        },
        _computeInputContentClass: function(a, b, c, d, e) {
            var f = "input-content";
            if (a) e && (f += " label-is-hidden");
            else {
                var g = this.querySelector("label");
                b || e ? (f += " label-is-floating", d ? f += " is-invalid" : c && (f += " label-is-highlighted"), this._numberOfPrefixNodes > 0 && (this.$.labelAndInputContainer.style.position = "static")) : g && (this.$.labelAndInputContainer.style.position = "relative")
            }
            return f
        },
        _computeUnderlineClass: function(a, b) {
            var c = "underline";
            return b ? c += " is-invalid" : a && (c += " is-highlighted"), c
        },
        _computeAddOnContentClass: function(a, b) {
            var c = "add-on-content";
            return b ? c += " is-invalid" : a && (c += " is-highlighted"), c
        }
    }), Polymer({
        is: "paper-input-error",
        behaviors: [Polymer.PaperInputAddonBehavior],
        properties: {
            invalid: {
                readOnly: !0,
                reflectToAttribute: !0,
                type: Boolean
            }
        },
        update: function(a) {
            this._setInvalid(a.invalid)
        }
    }), Polymer({
        is: "paper-input-char-counter",
        behaviors: [Polymer.PaperInputAddonBehavior],
        properties: {
            _charCounterStr: {
                type: String,
                value: "0"
            }
        },
        update: function(a) {
            if (a.inputElement) {
                a.value = a.value || "";
                var b = a.value.replace(/(\r\n|\n|\r)/g, "--").length;
                a.inputElement.hasAttribute("maxlength") && (b += "/" + a.inputElement.getAttribute("maxlength")), this._charCounterStr = b
            }
        }
    }), Polymer({
        is: "paper-input",
        behaviors: [Polymer.IronFormElementBehavior, Polymer.PaperInputBehavior, Polymer.IronControlState]
    }), Polymer({
        is: "iron-autogrow-textarea",
        behaviors: [Polymer.IronFormElementBehavior, Polymer.IronValidatableBehavior, Polymer.IronControlState],
        properties: {
            bindValue: {
                observer: "_bindValueChanged",
                type: String
            },
            rows: {
                type: Number,
                value: 1,
                observer: "_updateCached"
            },
            maxRows: {
                type: Number,
                value: 0,
                observer: "_updateCached"
            },
            autocomplete: {
                type: String,
                value: "off"
            },
            autofocus: {
                type: Boolean,
                value: !1
            },
            inputmode: {
                type: String
            },
            placeholder: {
                type: String
            },
            readonly: {
                type: String
            },
            required: {
                type: Boolean
            },
            minlength: {
                type: Number
            },
            maxlength: {
                type: Number
            }
        },
        listeners: {
            input: "_onInput"
        },
        observers: ["_onValueChanged(value)"],
        get textarea() {
            return this.$.textarea
        },
        get selectionStart() {
            return this.$.textarea.selectionStart
        },
        get selectionEnd() {
            return this.$.textarea.selectionEnd
        },
        set selectionStart(a) {
            this.$.textarea.selectionStart = a
        },
        set selectionEnd(a) {
            this.$.textarea.selectionEnd = a
        },
        attached: function() {
            var a = navigator.userAgent.match(/iP(?:[oa]d|hone)/);
            a && (this.$.textarea.style.marginLeft = "-3px")
        },
        validate: function() {
            if (!this.required && "" == this.value) return this.invalid = !1, !0;
            var a;
            return this.hasValidator() ? a = Polymer.IronValidatableBehavior.validate.call(this, this.value) : (a = this.$.textarea.validity.valid, this.invalid = !a), this.fire("iron-input-validate"), a
        },
        _bindValueChanged: function() {
            var a = this.textarea;
            a && (a.value !== this.bindValue && (a.value = this.bindValue || 0 === this.bindValue ? this.bindValue : ""), this.value = this.bindValue, this.$.mirror.innerHTML = this._valueForMirror(), this.fire("bind-value-changed", {
                value: this.bindValue
            }))
        },
        _onInput: function(a) {
            this.bindValue = a.path ? a.path[0].value : a.target.value
        },
        _constrain: function(a) {
            var b;
            for (a = a || [""], b = this.maxRows > 0 && a.length > this.maxRows ? a.slice(0, this.maxRows) : a.slice(0); this.rows > 0 && b.length < this.rows;) b.push("");
            return b.join("<br/>") + "&#160;"
        },
        _valueForMirror: function() {
            var a = this.textarea;
            if (a) return this.tokens = a && a.value ? a.value.replace(/&/gm, "&amp;").replace(/"/gm, "&quot;").replace(/'/gm, "&#39;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").split("\n") : [""], this._constrain(this.tokens)
        },
        _updateCached: function() {
            this.$.mirror.innerHTML = this._constrain(this.tokens)
        },
        _onValueChanged: function() {
            this.bindValue = this.value
        }
    }), Polymer({
        is: "paper-textarea",
        behaviors: [Polymer.PaperInputBehavior],
        properties: {
            _ariaLabelledBy: {
                observer: "_ariaLabelledByChanged",
                type: String
            },
            _ariaDescribedBy: {
                observer: "_ariaDescribedByChanged",
                type: String
            },
            rows: {
                type: Number,
                value: 1
            },
            maxRows: {
                type: Number,
                value: 0
            }
        },
        _ariaLabelledByChanged: function(a) {
            this.$.input.textarea.setAttribute("aria-labelledby", a)
        },
        _ariaDescribedByChanged: function(a) {
            this.$.input.textarea.setAttribute("aria-describedby", a)
        }
    }), Polymer({
        is: "report-dialog",
        open: function() {
            window.a = this.$.mainDialog, this.$.mainDialog.open()
        },
        download: function() {
            var a = report.generate(this.description),
                b = encodeURIComponent(a),
                c = document.createElement("a");
            c.setAttribute("href", "data:text/plain;charset=utf-8," + b), c.setAttribute("download", "testrtc-" + (new Date).toJSON() + ".log"), c.click()
        },
        upload: function() {
            this.submitting = !0;
            var a = new XMLHttpRequest;
            a.open("HEAD", "/report/new", !0), a.addEventListener("load", this.onGetUploadUrl_.bind(this), !1), a.send(null)
        },
        onGetUploadUrl_: function(a) {
            if (200 === a.currentTarget.status) {
                var b = "testrtc-" + (new Date).toJSON() + ".log",
                    c = report.generate(this.description),
                    d = new Blob([c], {
                        type: "text/plain"
                    }),
                    e = new FormData;
                e.append(b, d, b);
                var f = a.currentTarget.getResponseHeader("response-text"),
                    g = new XMLHttpRequest;
                g.open("POST", f, !0), g.setRequestHeader("X-File-Name", b), g.addEventListener("load", this.onUploadFile_.bind(this), !1), g.send(e)
            } else this.reportError = a.currentTarget.status, report.traceEventInstant("log-error", {
                error: this.reportError
            }), this.$.failure.open()
        },
        onUploadFile_: function(a) {
            200 === a.currentTarget.status ? (this.reportUrl = a.currentTarget.getResponseHeader("response-text"), report.traceEventInstant("log-uploaded", {
                url: this.reportUrl
            }), this.$.success.open()) : (this.reportError = a.currentTarget.status, report.traceEventInstant("log-error", {
                error: this.reportError
            }), this.$.failure.open())
        },
        closeFail: function() {
            this.submitting = !1
        },
        closeSuccess: function() {
            this.submitting = !1, this.description = "", this.$.mainDialog.close()
        }
    }), Polymer({
        is: "testrtc-main",
        properties: {
            settings: {
                type: Object,
                value: function() {
                    return parseUrlParameters()
                }
            }
        },
        _updateLink: function() {
            var a = window.location,
                b = [];
            for (var c in this.settings) "" !== this.settings[c] && b.push(encodeURIComponent(c) + "=" + encodeURIComponent(this.settings[c]));
            var d = 0 != b.length ? "?" + b.join("&") : "";
            this._link = a.protocol + "//" + a.host + a.pathname + d
        },
        observers: ["_pendingChanged(pending)", "_updateLink(settings.*)"],
        listeners: {
            "bug-report": "openBugReport"
        },
        _pendingChanged: function(a) {
            this.traceEnumDevice = report.traceEventAsync("enumerateDevices"), adapter.disableLog(!0), a === !1 && (navigator.mediaDevices.enumerateDevices().then(this.gotSources.bind(this))["catch"](function(a) {
                console.log("JS Device selection not supported", a)
            }), window.doGetUserMedia = this.doGetUserMedia.bind(this), this.$.startButton.removeAttribute("disabled"))
        },
        gotSources: function(a) {
            for (var b = 0; b !== a.length; ++b) {
                var c = a[b],
                    d = document.createElement("option");
                d.value = c.deviceId, this.appendOption(c, d)
            }
        },
        appendOption: function(a, b) {
            "audioinput" === a.kind ? (b.text = a.label || "microphone " + (this.$.audioSource.length + 1), this.$.audioSource.appendChild(b)) : "videoinput" === a.kind ? (b.text = a.label || "camera " + (this.$.videoSource.length + 1), this.$.videoSource.appendChild(b)) : this.traceEnumDevice("Some other kind of source: " + a.kind)
        },
        doGetUserMedia: function(a, b, c) {
            var d = this,
                e = report.traceEventAsync("getusermedia");
            try {
                this.appendSourceId(this.$.audioSource.value, "audio", a), this.appendSourceId(this.$.videoSource.value, "video", a), e({
                    status: "pending",
                    constraints: a
                }), navigator.mediaDevices.getUserMedia(a).then(function(a) {
                    var c = d.getDeviceName_(a.getVideoTracks()),
                        f = d.getDeviceName_(a.getAudioTracks());
                    e({
                        status: "success",
                        camera: c,
                        microphone: f
                    }), b.apply(this, arguments)
                })["catch"](function(a) {
                    e({
                        status: "fail",
                        error: a
                    }), c ? c.apply(this, arguments) : reportFatal("Failed to get access to local media due to error: " + a.name)
                })
            } catch (f) {
                return console.log(f), e({
                    status: "exception",
                    error: f.message
                }), reportFatal("getUserMedia failed with exception: " + f.message)
            }
        },
        appendSourceId: function(a, b, c) {
            c[b] === !0 ? c[b] = {
                optional: [{
                    sourceId: a
                }]
            } : "object" == typeof c[b] && ("undefined" == typeof c[b].optional && (c[b].optional = []), c[b].optional.push({
                sourceId: a
            }))
        },
        getDeviceName_: function(a) {
            return 0 === a.length ? null : a[0].label
        },
        run: function() {
            var a = this;
            this.$.startButton.setAttribute("disabled", null), runAllSequentially(enumeratedTestSuites, function() {
                a.$.startButton.removeAttribute("disabled")
            })
        },
        openBugReport: function() {
            this.pending = !1, this.$.bugreport.open()
        },
        openSettingsDialog: function() {
            this.$.settings.open()
        }
    });
try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext
} catch (e) {
    console.log("Failed to instantiate an audio context, error: " + e)
}
var enumeratedTestSuites = [],
    enumeratedTestFilters = [],
    parameters = parseUrlParameters(),
    filterParameterName = "test_filter";
filterParameterName in parameters && (enumeratedTestFilters = parameters[filterParameterName].split(",")), Call.prototype = {
    establishConnection: function() {
        this.traceEvent({
            state: "start"
        }), this.pc1.createOffer().then(this.gotOffer_.bind(this), this.test.reportFatal.bind(this.test))
    },
    close: function() {
        this.traceEvent({
            state: "end"
        }), this.pc1.close(), this.pc2.close()
    },
    setIceCandidateFilter: function(a) {
        this.iceCandidateFilter_ = a
    },
    constrainVideoBitrate: function(a) {
        this.constrainVideoBitrateKbps_ = a
    },
    disableVideoFec: function() {
        this.constrainOfferToRemoveVideoFec_ = !0
    },
    gatherStats: function(a, b, c) {
        function d() {
            return "closed" === a.signalingState ? (h.statsGatheringRunning = !1, void c(f, g)) : void a.getStats(j).then(e)["catch"](function(a) {
                h.test.reportError("Could not gather stats: " + a), h.statsGatheringRunning = !1, c(f, g)
            }.bind(h))
        }

        function e(a) {
            if ("chrome" === adapter.browserDetails.browser)
                for (var b in a) f.push(a[b]), g.push(Date.now());
            else if ("firefox" === adapter.browserDetails.browser)
                for (var c in a) {
                    var e = a[c];
                    f.push(e), g.push(Date.now())
                } else h.test.reportError("Only Firefox and Chrome getStats implementations are supported.");
            setTimeout(d, i)
        }
        var f = [],
            g = [],
            h = this,
            i = 100,
            j = "chrome" === adapter.browserDetails.browser ? b : null;
        this.statsGatheringRunning = !0, d()
    },
    gotOffer_: function(a) {
        this.constrainOfferToRemoveVideoFec_ && (a.sdp = a.sdp.replace(/(m=video 1 [^\r]+)(116 117)(\r\n)/g, "$1\r\n"), a.sdp = a.sdp.replace(/a=rtpmap:116 red\/90000\r\n/g, ""), a.sdp = a.sdp.replace(/a=rtpmap:117 ulpfec\/90000\r\n/g, ""), a.sdp = a.sdp.replace(/a=rtpmap:98 rtx\/90000\r\n/g, ""), a.sdp = a.sdp.replace(/a=fmtp:98 apt=116\r\n/g, "")), this.pc1.setLocalDescription(a), this.pc2.setRemoteDescription(a), this.pc2.createAnswer().then(this.gotAnswer_.bind(this), this.test.reportFatal.bind(this.test))
    },
    gotAnswer_: function(a) {
        this.constrainVideoBitrateKbps_ && (a.sdp = a.sdp.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + this.constrainVideoBitrateKbps_ + "\r\n")), this.pc2.setLocalDescription(a), this.pc1.setRemoteDescription(a)
    },
    onIceCandidate_: function(a, b) {
        if (b.candidate) {
            var c = Call.parseCandidate(b.candidate.candidate);
            this.iceCandidateFilter_(c) && a.addIceCandidate(b.candidate)
        }
    }
}, Call.noFilter = function() {
    return !0
}, Call.isRelay = function(a) {
    return "relay" === a.type
}, Call.isNotHostCandidate = function(a) {
    return "host" !== a.type
}, Call.isReflexive = function(a) {
    return "srflx" === a.type
}, Call.isHost = function(a) {
    return "host" === a.type
}, Call.isIpv6 = function(a) {
    return -1 !== a.address.indexOf(":")
}, Call.parseCandidate = function(a) {
    var b = "candidate:",
        c = a.indexOf(b) + b.length,
        d = a.substr(c).split(" ");
    return {
        type: d[7],
        protocol: d[2],
        address: d[4]
    }
}, Call.cachedIceServers_ = null, Call.cachedIceConfigFetchTime_ = null, Call.asyncCreateTurnConfig = function(a, b) {
    var c = currentTest.settings;
    if ("string" == typeof c.turnURI && "" !== c.turnURI) {
        var d = {
                username: c.turnUsername || "",
                credential: c.turnCredential || "",
                urls: c.turnURI.split(",")
            },
            e = {
                iceServers: [d]
            };
        report.traceEventInstant("turn-config", e), setTimeout(a.bind(null, e), 0)
    } else Call.fetchTurnConfig_(function(b) {
        var c = {
            iceServers: b.iceServers
        };
        report.traceEventInstant("turn-config", c), a(c)
    }, b)
}, Call.asyncCreateStunConfig = function(a, b) {
    var c = currentTest.settings;
    if ("string" == typeof c.stunURI && "" !== c.stunURI) {
        var d = {
                urls: c.stunURI.split(",")
            },
            e = {
                iceServers: [d]
            };
        report.traceEventInstant("stun-config", e), setTimeout(a.bind(null, e), 0)
    } else Call.fetchTurnConfig_(function(b) {
        var c = {
            iceServers: b.iceServers.urls
        };
        report.traceEventInstant("stun-config", c), a(c)
    }, b)
}, Call.fetchTurnConfig_ = function(a, b) {
    function c() {
        if (4 === f.readyState) {
            if (200 !== f.status) return void b("TURN request failed");
            var c = JSON.parse(f.responseText);
            Call.cachedIceServers_ = c, Call.getCachedIceCredentials_ = function() {
                return JSON.parse(JSON.stringify(Call.cachedIceServers_))
            }, Call.cachedIceConfigFetchTime_ = Date.now(), report.traceEventInstant("fetch-ice-config", "Fetching new credentials."), a(Call.getCachedIceCredentials_())
        }
    }
    var d = 240;
    if (Call.cachedIceServers_) {
        var e = (Date.now() - Call.cachedIceConfigFetchTime_) / 1e3 > parseInt(Call.cachedIceServers_.lifetimeDuration) - d;
        if (!e) return report.traceEventInstant("fetch-ice-config", "Using cached credentials."), void a(Call.getCachedIceCredentials_())
    }
    var f = new XMLHttpRequest;
    f.onreadystatechange = c, f.open("POST", "https://networktraversal.googleapis.com/v1alpha/iceconfig?key=AIzaSyDX4ctY_VWUm7lDdO6i_-bx7J-CDkxS16I", !0), f.send()
}, StatisticsAggregate.prototype = {
    add: function(a, b) {
        0 === this.startTime_ && (this.startTime_ = a), this.sum_ += b, this.max_ = Math.max(this.max_, b), this.rampUpTime_ === 1 / 0 && b > this.rampUpThreshold_ && (this.rampUpTime_ = a), this.count_++
    },
    getAverage: function() {
        return 0 === this.count_ ? 0 : Math.round(this.sum_ / this.count_)
    },
    getMax: function() {
        return this.max_
    },
    getRampUpTime: function() {
        return this.rampUpTime_ - this.startTime_
    }
}, Ssim.prototype = {
    statistics: function(a) {
        var b, c = 0;
        for (b = 0; b < a.length; ++b) c += a[b];
        var d = c / (a.length - 1),
            e = 0;
        for (b = 1; b < a.length; ++b) e = a[b - 1] - d, c += a[b] + e * e;
        return {
            mean: d,
            variance: c / a.length
        }
    },
    covariance: function(a, b, c, d) {
        for (var e = 0, f = 0; f < a.length; f += 1) e += (a[f] - c) * (b[f] - d);
        return e / a.length
    },
    calculate: function(a, b) {
        if (a.length !== b.length) return 0;
        var c = .01,
            d = .03,
            e = 255,
            f = c * e * (c * e),
            g = d * e * (d * e),
            h = g / 2,
            i = this.statistics(a),
            j = i.mean,
            k = i.variance,
            l = Math.sqrt(k),
            m = this.statistics(b),
            n = m.mean,
            o = m.variance,
            p = Math.sqrt(o),
            q = this.covariance(a, b, j, n),
            r = (2 * j * n + f) / (j * j + n * n + f),
            s = (q + h) / (l * p + h),
            t = (2 * l * p + g) / (k + o + g);
        return r * t * s
    }
};
var testCaseName = new TestCaseNames,
    testSuiteName = new TestSuiteNames;
addTest(testSuiteName.MICROPHONE, testCaseName.AUDIOCAPTURE, function(a) {
    var b = new MicTest(a);
    b.run()
}), MicTest.prototype = {
    run: function() {
        "undefined" == typeof audioContext ? (this.test.reportError("WebAudio is not supported, test cannot run."), this.test.done()) : doGetUserMedia(this.constraints, this.gotStream.bind(this))
    },
    gotStream: function(a) {
        return this.checkAudioTracks(a) ? void this.createAudioBuffer(a) : void this.test.done()
    },
    checkAudioTracks: function(a) {
        this.stream = a;
        var b = a.getAudioTracks();
        return b.length < 1 ? (this.test.reportError("No audio track in returned stream."), !1) : (this.test.reportSuccess("Audio track created using device=" + b[0].label), !0)
    },
    createAudioBuffer: function() {
        this.audioSource = audioContext.createMediaStreamSource(this.stream), this.scriptNode = audioContext.createScriptProcessor(this.bufferSize, this.inputChannelCount, this.outputChannelCount), this.audioSource.connect(this.scriptNode), this.scriptNode.connect(audioContext.destination), this.scriptNode.onaudioprocess = this.collectAudio.bind(this), this.stopCollectingAudio = setTimeoutWithProgressBar(this.onStopCollectingAudio.bind(this), 5e3)
    },
    collectAudio: function(a) {
        for (var b = a.inputBuffer.length, c = !0, d = 0; d < a.inputBuffer.numberOfChannels; d++) {
            var e, f = a.inputBuffer.getChannelData(d),
                g = Math.abs(f[0]),
                h = Math.abs(f[b - 1]);
            g > this.silentThreshold || h > this.silentThreshold ? (e = new Float32Array(b), e.set(f), c = !1) : e = new Float32Array, this.collectedAudio[d].push(e)
        }
        c || (this.collectedSampleCount += b, this.collectedSampleCount / a.inputBuffer.sampleRate >= this.collectSeconds && this.stopCollectingAudio())
    },
    onStopCollectingAudio: function() {
        this.stream.getAudioTracks()[0].stop(), this.audioSource.disconnect(this.scriptNode), this.scriptNode.disconnect(audioContext.destination), this.analyzeAudio(this.collectedAudio), this.test.done()
    },
    analyzeAudio: function(a) {
        for (var b = [], c = 0; c < a.length; c++) this.channelStats(c, a[c]) && b.push(c);
        0 === b.length ? this.test.reportError("No active input channels detected. Microphone is most likely muted or broken, please check if muted in the sound settings or physically on the device. Then rerun the test.") : this.test.reportSuccess("Active audio input channels: " + b.length), 2 === b.length && this.detectMono(a[b[0]], a[b[1]])
    },
    channelStats: function(a, b) {
        for (var c = 0, d = 0, e = 0, f = 0, g = 0; g < b.length; g++) {
            var h = b[g];
            if (h.length > 0) {
                for (var i = 0, j = 0, k = 0; k < h.length; k++) i = Math.abs(h[k]), c = Math.max(c, i), j += i * i, c >= this.clipThreshold ? (e++, f = Math.max(f, e)) : e = 0;
                j = Math.sqrt(j / h.length), d = Math.max(d, j)
            }
        }
        if (c > this.silentThreshold) {
            var l = this.dBFS(c),
                m = this.dBFS(d);
            return this.test.reportInfo("Channel " + a + " levels: " + l.toFixed(1) + " dB (peak), " + m.toFixed(1) + " dB (RMS)"), m < this.lowVolumeThreshold && this.test.reportError("Microphone input level is low, increase input volume or move closer to the microphone."), f > this.clipCountThreshold && this.test.reportWarning("Clipping detected! Microphone input level is high. Decrease input volume or move away from the microphone."), !0
        }
        return !1
    },
    detectMono: function(a, b) {
        for (var c = 0, d = 0; d < a.length; d++) {
            var e = a[d],
                f = b[d];
            if (e.length === f.length)
                for (var g = 0, h = 0; h < e.length; h++) g = Math.abs(e[h] - f[h]), g > this.monoDetectThreshold && c++;
            else c++
        }
        c > 0 ? this.test.reportInfo("Stereo microphone detected.") : this.test.reportInfo("Mono microphone detected.")
    },
    dBFS: function(a) {
        var b = 20 * Math.log(a) / Math.log(10);
        return Math.round(10 * b) / 10
    }
}, addTest(testSuiteName.CAMERA, testCaseName.CHECKRESOLUTION240, function(a) {
    var b = new CamResolutionsTest(a, [
        [320, 240]
    ]);
    b.run()
}), addTest(testSuiteName.CAMERA, testCaseName.CHECKRESOLUTION480, function(a) {
    var b = new CamResolutionsTest(a, [
        [640, 480]
    ]);
    b.run()
}), addTest(testSuiteName.CAMERA, testCaseName.CHECKRESOLUTION720, function(a) {
    var b = new CamResolutionsTest(a, [
        [1280, 720]
    ]);
    b.run()
}), addTest(testSuiteName.CAMERA, testCaseName.CHECKSUPPORTEDRESOLUTIONS, function(a) {
    var b = [
            [160, 120],
            [320, 180],
            [320, 240],
            [640, 360],
            [640, 480],
            [768, 576],
            [1024, 576],
            [1280, 720],
            [1280, 768],
            [1280, 800],
            [1920, 1080],
            [1920, 1200],
            [3840, 2160],
            [4096, 2160]
        ],
        c = new CamResolutionsTest(a, b);
    c.run()
}), CamResolutionsTest.prototype = {
    run: function() {
        this.startGetUserMedia(this.resolutions[this.currentResolution])
    },
    startGetUserMedia: function(a) {
        var b = {
            audio: !1,
            video: {
                width: {
                    exact: a[0]
                },
                height: {
                    exact: a[1]
                }
            }
        };
        navigator.mediaDevices.getUserMedia(b).then(function(b) {
            this.resolutions.length > 1 ? (this.test.reportSuccess("Supported: " + a[0] + "x" + a[1]), b.getTracks().forEach(function(a) {
                a.stop()
            }), this.maybeContinueGetUserMedia()) : this.collectAndAnalyzeStats_(b, a)
        }.bind(this))["catch"](function(b) {
            this.resolutions.length > 1 ? this.test.reportInfo(a[0] + "x" + a[1] + " not supported") : this.test.reportError("getUserMedia failed with error: " + b.name), this.maybeContinueGetUserMedia()
        }.bind(this))
    },
    maybeContinueGetUserMedia: function() {
        return this.currentResolution === this.resolutions.length ? void this.test.done() : void this.startGetUserMedia(this.resolutions[this.currentResolution++])
    },
    collectAndAnalyzeStats_: function(a, b) {
        var c = a.getVideoTracks();
        if (c.length < 1) return this.test.reportError("No video track in returned stream."), void this.maybeContinueGetUserMedia();
        var d = c[0];
        "function" == typeof d.addEventListener && (d.addEventListener("ended", function() {
            this.isShuttingDown || this.test.reportError("Video track ended, camera stopped working")
        }.bind(this)), d.addEventListener("mute", function() {
            this.isShuttingDown || (this.test.reportWarning("Your camera reported itself as muted."), this.isMuted = !0)
        }.bind(this)), d.addEventListener("unmute", function() {
            this.isShuttingDown || (this.test.reportInfo("Your camera reported itself as unmuted."), this.isMuted = !1)
        }.bind(this)));
        var e = document.createElement("video");
        e.setAttribute("autoplay", ""), e.setAttribute("muted", ""), e.width = b[0], e.height = b[1], e.srcObject = a;
        var f = new VideoFrameChecker(e),
            g = new Call(null, this.test);
        g.pc1.addStream(a), g.establishConnection(), g.gatherStats(g.pc1, a, this.onCallEnded_.bind(this, b, e, a, f), 100), setTimeoutWithProgressBar(this.endCall_.bind(this, g, a), 8e3)
    },
    onCallEnded_: function(a, b, c, d, e, f) {
        this.analyzeStats_(a, b, c, d, e, f), d.stop(), this.test.done()
    },
    analyzeStats_: function(a, b, c, d, e, f) {
        var g = [],
            h = [],
            i = [],
            j = {},
            k = d.frameStats;
        for (var l in e) "ssrc" === e[l].type && parseInt(e[l].googFrameRateInput) > 0 && (g.push(parseInt(e[l].googAvgEncodeMs)), h.push(parseInt(e[l].googFrameRateInput)), i.push(parseInt(e[l].googFrameRateSent)));
        j.cameraName = c.getVideoTracks()[0].label || NaN, j.actualVideoWidth = b.videoWidth, j.actualVideoHeight = b.videoHeight, j.mandatoryWidth = a[0], j.mandatoryHeight = a[1], j.encodeSetupTimeMs = this.extractEncoderSetupTime_(e, f), j.avgEncodeTimeMs = arrayAverage(g), j.minEncodeTimeMs = arrayMin(g), j.maxEncodeTimeMs = arrayMax(g), j.avgInputFps = arrayAverage(h), j.minInputFps = arrayMin(h), j.maxInputFps = arrayMax(h), j.avgSentFps = arrayAverage(i), j.minSentFps = arrayMin(i), j.maxSentFps = arrayMax(i), j.isMuted = this.isMuted, j.testedFrames = k.numFrames, j.blackFrames = k.numBlackFrames, j.frozenFrames = k.numFrozenFrames, report.traceEventInstant("video-stats", j), this.testExpectations_(j)
    },
    endCall_: function(a, b) {
        this.isShuttingDown = !0, b.getTracks().forEach(function(a) {
            a.stop()
        }), a.close()
    },
    extractEncoderSetupTime_: function(a, b) {
        for (var c = 0; c !== a.length; c++)
            if ("ssrc" === a[c].type && parseInt(a[c].googFrameRateInput) > 0) return JSON.stringify(b[c] - b[0]);
        return NaN
    },
    resolutionMatchesIndependentOfRotationOrCrop_: function(a, b, c, d) {
        var e = Math.min(c, d);
        return a === c && b === d || a === d && b === c || a === e && d === e
    },
    testExpectations_: function(a) {
        var b = [];
        for (var c in a) a.hasOwnProperty(c) && ("number" == typeof a[c] && isNaN(a[c]) ? b.push(c) : this.test.reportInfo(c + ": " + a[c]));
        0 !== b.length && this.test.reportInfo("Not available: " + b.join(", ")), isNaN(a.avgSentFps) ? this.test.reportInfo("Cannot verify sent FPS.") : a.avgSentFps < 5 ? this.test.reportError("Low average sent FPS: " + a.avgSentFps) : this.test.reportSuccess("Average FPS above threshold"), this.resolutionMatchesIndependentOfRotationOrCrop_(a.actualVideoWidth, a.actualVideoHeight, a.mandatoryWidth, a.mandatoryHeight) ? this.test.reportSuccess("Captured video using expected resolution.") : this.test.reportError("Incorrect captured resolution."), 0 === a.testedFrames ? this.test.reportError("Could not analyze any video frame.") : (a.blackFrames > a.testedFrames / 3 && this.test.reportError("Camera delivering lots of black frames."), a.frozenFrames > a.testedFrames / 3 && this.test.reportError("Camera delivering lots of frozen frames."))
    }
}, VideoFrameChecker.prototype = {
    stop: function() {
        this.videoElement_.removeEventListener("play", this.listener_), this.running_ = !1
    },
    getCurrentImageData_: function() {
        this.canvas_.width = this.videoElement_.width, this.canvas_.height = this.videoElement_.height;
        var a = this.canvas_.getContext("2d");
        return a.drawImage(this.videoElement_, 0, 0, this.canvas_.width, this.canvas_.height), a.getImageData(0, 0, this.canvas_.width, this.canvas_.height)
    },
    checkVideoFrame_: function() {
        if (this.running_ && !this.videoElement_.ended) {
            var a = this.getCurrentImageData_();
            this.isBlackFrame_(a.data, a.data.length) && this.frameStats.numBlackFrames++, this.frameComparator.calculate(this.previousFrame_, a.data) > this.identicalFrameSsimThreshold && this.frameStats.numFrozenFrames++, this.previousFrame_ = a.data, this.frameStats.numFrames++, setTimeout(this.checkVideoFrame_.bind(this), 20)
        }
    },
    isBlackFrame_: function(a, b) {
        for (var c = this.nonBlackPixelLumaThreshold, d = 0, e = 4; b > e; e += 4)
            if (d += .21 * a[e] + .72 * a[e + 1] + .07 * a[e + 2], d > c * e / 4) return !1;
        return !0
    }
}, addTest(testSuiteName.NETWORK, testCaseName.UDPENABLED, function(a) {
    var b = new NetworkTest(a, "udp", null, Call.isRelay);
    b.run()
}), addTest(testSuiteName.NETWORK, testCaseName.TCPENABLED, function(a) {
    var b = new NetworkTest(a, "tcp", null, Call.isRelay);
    b.run()
}), addTest(testSuiteName.NETWORK, testCaseName.IPV6ENABLED, function(a) {
    var b = {
            optional: [{
                googIPv6: !0
            }]
        },
        c = new NetworkTest(a, null, b, Call.isIpv6);
    c.run()
});
var NetworkTest = function(a, b, c, d) {
    this.test = a, this.protocol = b, this.params = c, this.iceCandidateFilter = d
};
NetworkTest.prototype = {
    run: function() {
        this.iceCandidateFilter.toString() === Call.isIpv6.toString() ? this.gatherCandidates(null, this.params, this.iceCandidateFilter) : Call.asyncCreateTurnConfig(this.start.bind(this), this.test.reportFatal.bind(this.test))
    },
    start: function(a) {
        this.filterConfig(a, this.protocol), this.gatherCandidates(a, this.params, this.iceCandidateFilter)
    },
    filterConfig: function(a, b) {
        for (var c = "transport=" + b, d = [], e = 0; e < a.iceServers.length; ++e) {
            for (var f = a.iceServers[e], g = [], h = 0; h < f.urls.length; ++h) {
                var i = f.urls[h]; - 1 !== i.indexOf(c) ? g.push(i) : -1 === i.indexOf("?transport=") && i.startsWith("turn") && g.push(i + "?" + c)
            }
            0 !== g.length && (f.urls = g, d.push(f))
        }
        a.iceServers = d
    },
    gatherCandidates: function(a, b, c) {
        var d;
        try {
            d = new RTCPeerConnection(a, b)
        } catch (e) {
            return null !== b && b.optional[0].googIPv6 ? this.test.reportWarning("Failed to create peer connection, IPv6 might not be setup/supported on the network.") : this.test.reportError("Failed to create peer connection: " + e), void this.test.done()
        }
        d.addEventListener("icecandidate", function(a) {
            if ("closed" !== a.currentTarget.signalingState)
                if (a.candidate) {
                    var e = Call.parseCandidate(a.candidate.candidate);
                    c(e) && (this.test.reportSuccess("Gathered candidate of Type: " + e.type + " Protocol: " + e.protocol + " Address: " + e.address), d.close(), d = null, this.test.done())
                } else d.close(), d = null, null !== b && b.optional[0].googIPv6 ? this.test.reportWarning("Failed to gather IPv6 candidates, it might not be setup/supported on the network.") : this.test.reportError("Failed to gather specified candidates"), this.test.done()
        }.bind(this)), this.createAudioOnlyReceiveOffer(d)
    },
    createAudioOnlyReceiveOffer: function(a) {
        function b() {}
        var c = {
            offerToReceiveAudio: 1
        };
        a.createOffer(c).then(function(c) {
            a.setLocalDescription(c).then(b, b)
        }, b)
    }
}, addTest(testSuiteName.CONNECTIVITY, testCaseName.RELAYCONNECTIVITY, function(a) {
    var b = new RunConnectivityTest(a, Call.isRelay);
    b.run()
}), addTest(testSuiteName.CONNECTIVITY, testCaseName.REFLEXIVECONNECTIVITY, function(a) {
    var b = new RunConnectivityTest(a, Call.isReflexive);
    b.run()
}), addTest(testSuiteName.CONNECTIVITY, testCaseName.HOSTCONNECTIVITY, function(a) {
    var b = new RunConnectivityTest(a, Call.isHost);
    b.start()
}), RunConnectivityTest.prototype = {
    run: function() {
        Call.asyncCreateTurnConfig(this.start.bind(this), this.test.reportFatal.bind(this.test))
    },
    start: function(a) {
        this.call = new Call(a, this.test), this.call.setIceCandidateFilter(this.iceCandidateFilter), this.call.pc1.addEventListener("icecandidate", function(a) {
            if (a.candidate) {
                var b = Call.parseCandidate(a.candidate.candidate);
                this.parsedCandidates.push(b), this.iceCandidateFilter(b) && this.test.reportInfo("Gathered candidate of Type: " + b.type + " Protocol: " + b.protocol + " Address: " + b.address)
            }
        }.bind(this));
        var b = this.call.pc1.createDataChannel(null);
        b.addEventListener("open", function() {
            b.send("hello")
        }), b.addEventListener("message", function(a) {
            "world" !== a.data ? this.test.reportError("Invalid data transmitted.") : this.test.reportSuccess("Data successfully transmitted between peers."), this.hangup()
        }.bind(this)), this.call.pc2.addEventListener("datachannel", function(a) {
            var b = a.channel;
            b.addEventListener("message", function(a) {
                "hello" !== a.data ? this.hangup("Invalid data transmitted.") : b.send("world")
            }.bind(this))
        }.bind(this)), this.call.establishConnection(), this.timeout = setTimeout(this.hangup.bind(this, "Timed out"), 5e3)
    },
    findParsedCandidateOfSpecifiedType: function(a) {
        for (var b in this.parsedCandidates)
            if (a(this.parsedCandidates[b])) return a(this.parsedCandidates[b])
    },
    hangup: function(a) {
        a && ("Timed out" === a && this.iceCandidateFilter.toString() === Call.isReflexive.toString() && this.findParsedCandidateOfSpecifiedType(Call.isReflexive) ? this.test.reportWarning("Could not connect using reflexive candidates, likely due to the network environment/configuration.") : this.test.reportError(a)), clearTimeout(this.timeout), this.call.close(), this.test.done()
    }
}, addTest(testSuiteName.THROUGHPUT, testCaseName.DATATHROUGHPUT, function(a) {
    var b = new DataChannelThroughputTest(a);
    b.run()
}), DataChannelThroughputTest.prototype = {
    run: function() {
        Call.asyncCreateTurnConfig(this.start.bind(this), this.test.reportFatal.bind(this.test))
    },
    start: function(a) {
        this.call = new Call(a, this.test), this.call.setIceCandidateFilter(Call.isRelay), this.senderChannel = this.call.pc1.createDataChannel(null), this.senderChannel.addEventListener("open", this.sendingStep.bind(this)), this.call.pc2.addEventListener("datachannel", this.onReceiverChannel.bind(this)), this.call.establishConnection()
    },
    onReceiverChannel: function(a) {
        this.receiveChannel = a.channel, this.receiveChannel.addEventListener("message", this.onMessageReceived.bind(this))
    },
    sendingStep: function() {
        var a = new Date;
        this.startTime || (this.startTime = a, this.lastBitrateMeasureTime = a);
        for (var b = 0; b !== this.maxNumberOfPacketsToSend && !(this.senderChannel.bufferedAmount >= this.bytesToKeepBuffered); ++b) this.sentPayloadBytes += this.samplePacket.length, this.senderChannel.send(this.samplePacket);
        a - this.startTime >= 1e3 * this.testDurationSeconds ? (this.test.setProgress(100), this.stopSending = !0) : (this.test.setProgress((a - this.startTime) / (10 * this.testDurationSeconds)), setTimeout(this.sendingStep.bind(this), 1))
    },
    onMessageReceived: function(a) {
        this.receivedPayloadBytes += a.data.length;
        var b = new Date;
        if (b - this.lastBitrateMeasureTime >= 1e3) {
            var c = (this.receivedPayloadBytes - this.lastReceivedPayloadBytes) / (b - this.lastBitrateMeasureTime);
            c = Math.round(1e3 * c * 8) / 1e3, this.test.reportSuccess("Transmitting at " + c + " kbps."), this.lastReceivedPayloadBytes = this.receivedPayloadBytes, this.lastBitrateMeasureTime = b
        }
        if (this.stopSending && this.sentPayloadBytes === this.receivedPayloadBytes) {
            this.call.close(), this.call = null;
            var d = Math.round(10 * (b - this.startTime)) / 1e4,
                e = 8 * this.receivedPayloadBytes / 1e3;
            this.test.reportSuccess("Total transmitted: " + e + " kilo-bits in " + d + " seconds."), this.test.done()
        }
    }
}, addTest(testSuiteName.THROUGHPUT, testCaseName.VIDEOBANDWIDTH, function(a) {
    var b = new VideoBandwidthTest(a);
    b.run()
}), VideoBandwidthTest.prototype = {
    run: function() {
        Call.asyncCreateTurnConfig(this.start.bind(this), this.test.reportFatal.bind(this.test))
    },
    start: function(a) {
        this.call = new Call(a, this.test), this.call.setIceCandidateFilter(Call.isRelay), this.call.disableVideoFec(), this.call.constrainVideoBitrate(this.maxVideoBitrateKbps), doGetUserMedia(this.constraints, this.gotStream.bind(this))
    },
    gotStream: function(a) {
        this.call.pc1.addStream(a), this.call.establishConnection(), this.startTime = new Date, this.localStream = a.getVideoTracks()[0], setTimeout(this.gatherStats.bind(this), this.statStepMs)
    },
    gatherStats: function() {
        var a = new Date;
        return a - this.startTime > this.durationMs ? (this.test.setProgress(100), void this.hangup()) : (this.call.statsGatheringRunning || this.call.gatherStats(this.call.pc1, this.localStream, this.gotStats.bind(this)), this.test.setProgress(100 * (a - this.startTime) / this.durationMs), void setTimeout(this.gatherStats.bind(this), this.statStepMs))
    },
    gotStats: function(a) {
        if ("chrome" === adapter.browserDetails.browser)
            for (var b in a) "bweforvideo" === a[b].id ? this.bweStats.add(Date.parse(a[b].timestamp), parseInt(a[b].googAvailableSendBandwidth)) : "ssrc" === a[b].type && (this.rttStats.add(Date.parse(a[b].timestamp), parseInt(a[b].googRtt)), this.videoStats[0] = a[b].googFrameWidthSent, this.videoStats[1] = a[b].googFrameHeightSent, this.packetsLost = a[b].packetsLost);
        else if ("firefox" === adapter.browserDetails.browser)
            for (var c in a) "outbound_rtcp_video_0" === a[c].id ? (this.rttStats.add(Date.parse(a[c].timestamp), parseInt(a[c].mozRtt)),
                this.jitter = a[c].jitter, this.packetsLost = a[c].packetsLost) : "outbound_rtp_video_0" === a[c].id && (this.videoStats[0] = "Not supported on Firefox", this.videoStats[1] = "Not supported on Firefox", this.bitrateMean = a[c].bitrateMean, this.bitrateStdDev = a[c].bitrateStdDev, this.framerateMean = a[c].framerateMean);
        else this.test.reportError("Only Firefox and Chrome getStats implementations are supported.");
        this.completed()
    },
    hangup: function() {
        this.call.pc1.getLocalStreams()[0].getTracks().forEach(function(a) {
            a.stop()
        }), this.call.close(), this.call = null
    },
    completed: function() {
        "chrome" === adapter.browserDetails.browser ? this.videoStats[0] < 2 && this.videoStats[1] < 2 ? this.test.reportError("Camera failure: " + this.videoStats[0] + "x" + this.videoStats[1] + ". Cannot test bandwidth without a working  camera.") : (this.test.reportSuccess("Video resolution: " + this.videoStats[0] + "x" + this.videoStats[1]), this.test.reportInfo("Send bandwidth estimate average: " + this.bweStats.getAverage() + " bps"), this.test.reportInfo("Send bandwidth estimate max: " + this.bweStats.getMax() + " bps"), this.test.reportInfo("Send bandwidth ramp-up time: " + this.bweStats.getRampUpTime() + " ms")) : "firefox" === adapter.browserDetails.browser && (parseInt(this.framerateMean) > 0 ? this.test.reportSuccess("Frame rate mean: " + parseInt(this.framerateMean)) : this.test.reportError("Frame rate mean is 0, cannot test bandwidth without a working camera."), this.test.reportInfo("Send bitrate mean: " + parseInt(this.bitrateMean) + " bps"), this.test.reportInfo("Send bitrate standard deviation: " + parseInt(this.bitrateStdDev) + " bps")), this.test.reportInfo("RTT average: " + this.rttStats.getAverage() + " ms"), this.test.reportInfo("RTT max: " + this.rttStats.getMax() + " ms"), this.test.reportInfo("Lost packets: " + this.packetsLost), this.test.done()
    }
}, addExplicitTest(testSuiteName.THROUGHPUT, testCaseName.NETWORKLATENCY, function(a) {
    var b = new WiFiPeriodicScanTest(a, Call.isNotHostCandidate);
    b.run()
}), addExplicitTest(testSuiteName.THROUGHPUT, testCaseName.NETWORKLATENCYRELAY, function(a) {
    var b = new WiFiPeriodicScanTest(a, Call.isRelay);
    b.run()
}), WiFiPeriodicScanTest.prototype = {
    run: function() {
        Call.asyncCreateTurnConfig(this.start.bind(this), this.test.reportFatal.bind(this.test))
    },
    start: function(a) {
        this.running = !0, this.call = new Call(a, this.test), this.chart = this.test.createLineChart(), this.call.setIceCandidateFilter(this.candidateFilter), this.senderChannel = this.call.pc1.createDataChannel({
            ordered: !1,
            maxRetransmits: 0
        }), this.senderChannel.addEventListener("open", this.send.bind(this)), this.call.pc2.addEventListener("datachannel", this.onReceiverChannel.bind(this)), this.call.establishConnection(), setTimeoutWithProgressBar(this.finishTest.bind(this), this.testDurationMs)
    },
    onReceiverChannel: function(a) {
        this.receiveChannel = a.channel, this.receiveChannel.addEventListener("message", this.receive.bind(this))
    },
    send: function() {
        this.running && (this.senderChannel.send("" + Date.now()), setTimeout(this.send.bind(this), this.sendIntervalMs))
    },
    receive: function(a) {
        if (this.running) {
            var b = parseInt(a.data),
                c = Date.now() - b;
            this.recvTimeStamps.push(b), this.delays.push(c), this.chart.addDatapoint(b + c, c)
        }
    },
    finishTest: function() {
        report.traceEventInstant("periodic-delay", {
            delays: this.delays,
            recvTimeStamps: this.recvTimeStamps
        }), this.running = !1, this.call.close(), this.call = null, this.chart.parentElement.removeChild(this.chart);
        var a = arrayAverage(this.delays),
            b = arrayMax(this.delays),
            c = arrayMin(this.delays);
        this.test.reportInfo("Average delay: " + a + " ms."), this.test.reportInfo("Min delay: " + c + " ms."), this.test.reportInfo("Max delay: " + b + " ms."), this.delays.length < .8 * this.testDurationMs / this.sendIntervalMs ? this.test.reportError("Not enough samples gathered. Keep the page on  the foreground while the test is running.") : this.test.reportSuccess("Collected " + this.delays.length + " delay samples."), b > 2 * (c + 100) && this.test.reportError("There is a big difference between the min and max delay of packets. Your network appears unstable."), this.test.done()
    }
};