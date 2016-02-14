var Highcharts = require('highcharts');
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        var chart = new Highcharts.Chart({
            chart: {
                type: 'spline',
                renderTo: 'container',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function() {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        var series2 = this.series[1];
                        // var series3 = this.series[2];
                        setInterval(function() {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                                z = Math.random();
                            series.addPoint([x, y], false, true);
                            series2.addPoint([x, z], true, true);
                        }, 1000);
                        // setInterval(function() {
                        //     var x = (new Date()).getTime(), // current time
                        //         y = Math.random();
                        //         z = Math.random();
                        //         a = Math.random();
                        //     series.addPoint([x, y], false, true);
                        //     series3.addPoint([x, a], true, true);
                        // }, 1000);
                    }
                }
            },
            title: {
                text: 'Audience Sentiment'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: [{
                title: {
                    text: 'Positive'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#990000'
                }]
            },
            {
                title: {
                    text: 'Negative'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#34a853'
                }]
            },
            // {
            //     title: {
            //         text: 'Value3'
            //     },
            //     plotLines: [{
            //         value: 0,
            //         width: 1,
            //         color: '#808080'
            //     }]
            // }
            ],
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 3);
                }
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random Negative',
                color: '#990000',
                marker: {
                   enabled: false
                },
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                })()
            },
            {
                name: 'Random Positive',
                color: '#34a853',
                marker: {
                   enabled: false
                },
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                })()
            },
            // {
            //     name: 'Random data',
            //     marker: {
            //        enabled: false
            //     },
            //     data: (function() {
            //         // generate an array of random data
            //         var data = [],
            //             time = (new Date()).getTime(),
            //             i;

            //         for (i = -19; i <= 0; i++) {
            //             data.push({
            //                 x: time + i * 1000,
            //                 y: Math.random()
            //             });
            //         }
            //         return data;
            //     })()
            // }
            ]
        });
