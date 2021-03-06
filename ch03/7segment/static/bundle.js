(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var display = require('../drawings/7_segment_labelled.svg')(0,0);

var SegmentViews = Backbone.View.extend({

  events: {
    'click': 'handleClick'
  },

  render: function() {
    this.$el.attr('style', this.model.getColor());
  },

  handleClick: function(e) {
    this.model.toggle();
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  }

});

var StatusView = Backbone.View.extend({

  render: function() {
    var tmpl = 'Segment: ' + this.a.get('name') + ' PIN:   ' + this.a.get('pin') + ' LED: ' + this.a.getState() + ' <br> ';
    tmpl += 'Segment: ' + this.b.get('name') + ' PIN:   ' + this.b.get('pin') + ' LED: ' + this.b.getState() + ' <br> ';
    tmpl += 'Segment: ' + this.c.get('name') + ' PIN:   ' + this.c.get('pin') + ' LED: ' + this.c.getState() + ' <br> ';
    tmpl += 'Segment: ' + this.d.get('name') + ' PIN:   ' + this.d.get('pin') + ' LED: ' + this.d.getState() + ' <br> ';
    tmpl += 'Segment: ' + this.e.get('name') + ' PIN:   ' + this.e.get('pin') + ' LED: ' + this.e.getState() + ' <br> ';
    tmpl += 'Segment: ' + this.f.get('name') + ' PIN:   ' + this.f.get('pin') + ' LED: ' + this.f.getState() + ' <br> ';
    tmpl += 'Segment: ' + this.g.get('name') + ' PIN:   ' + this.g.get('pin') + ' LED: ' + this.g.getState() + ' <br> ';

    this.$el.html(tmpl);
  },

  initialize: function(options) {
    this.a = options.a;
    this.b = options.b;
    this.c = options.c;
    this.d = options.d;
    this.e = options.e;
    this.f = options.f;
    this.g = options.g;

    this.listenTo(this.a, 'change', this.render);
    this.listenTo(this.b, 'change', this.render);
    this.listenTo(this.c, 'change', this.render);
    this.listenTo(this.d, 'change', this.render);
    this.listenTo(this.e, 'change', this.render);
    this.listenTo(this.f, 'change', this.render);
    this.listenTo(this.g, 'change', this.render);
  }


});


var SegmentModel = Backbone.Model.extend({

  url: function() {
    return '/api/' + this.get('pin') + '/' + this.getState();
  },

  getColor: function() {
    return (this.get('active') ? 'fill:red' : 'fill: #DDDDDD');
  },

  toggle: function() {
    var active = this.get('active');
    this.set('active', !active);
    this.save();
  },

  getState: function() {
    return this.get('active') ? 'ON' : 'OFF';
  }

});


var a = new SegmentModel({name: 'a', pin: 12, active: 0}); 
var b = new SegmentModel({name: 'b', pin: 11, active: 0}); 
var c = new SegmentModel({name: 'c', pin: 3, active: 0}); 
var d = new SegmentModel({name: 'd', pin: 8, active: 0}); 
var e = new SegmentModel({name: 'e', pin: 2, active: 0}); 
var f = new SegmentModel({name: 'f', pin: 9, active: 0}); 
var g = new SegmentModel({name: 'g', pin: 7, active: 0}); 


$(document).ready(function() {

  $('svg').append(display);
  var segmentView_a = new SegmentViews({model: a, el: '#a'});
  var segmentView_b = new SegmentViews({model: b, el: '#b'});
  var segmentView_c = new SegmentViews({model: c, el: '#c'});
  var segmentView_d = new SegmentViews({model: d, el: '#d'});
  var segmentView_e = new SegmentViews({model: e, el: '#e'});
  var segmentView_f = new SegmentViews({model: f, el: '#f'});
  var segmentView_g = new SegmentViews({model: g, el: '#g'});

  var statusView = new StatusView({el: '.status', a: a, b: b, c: c, d: d, e: e, f: f, g: g });
  statusView.render();

});

},{"../drawings/7_segment_labelled.svg":2}],2:[function(require,module,exports){
function format(text) {return function(x, y) {x = (+x|0);y = (+y|0);var el = document.createElement("div");el.innerHTML = "<svg><g><g>" + text + "</g></g></svg>";el = el.childNodes[0].childNodes[0];el.childNodes[0].setAttribute("transform", "translate(" + x + "," + y + ")");return el}}
module.exports = format("\n<g id=\"none\" style=\"fill-rule:evenodd; stroke:#FFFFFF; stroke-width:0.25; stroke-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;\">\n  <polygon id=\"a\" points=\" 1, 1  2, 0  8, 0  9, 1  8, 2  2, 2\" fill=\"#DDDDDD\"/>\n  <polygon id=\"b\" points=\" 9, 1 10, 2 10, 8  9, 9  8, 8  8, 2\" fill=\"#DDDDDD\"/>\n  <polygon id=\"c\" points=\" 9, 9 10,10 10,16  9,17  8,16  8,10\" fill=\"#DDDDDD\"/>\n  <polygon id=\"d\" points=\" 9,17  8,18  2,18  1,17  2,16  8,16\" fill=\"#DDDDDD\"/>\n  <polygon id=\"e\" points=\" 1,17  0,16  0,10  1, 9  2,10  2,16\" fill=\"#DDDDDD\"/>\n  <polygon id=\"f\" points=\" 1, 9  0, 8  0, 2  1, 1  2, 2  2, 8\" fill=\"#DDDDDD\"/>\n  <polygon id=\"g\" points=\" 1, 9  2, 8  8, 8  9, 9  8,10  2,10\" fill=\"#DDDDDD\"/>\n</g> \n")
},{}]},{},[1]);
