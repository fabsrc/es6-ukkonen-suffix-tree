/*jshint esnext: true, -W097  */
/* globals console */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Node = (function () {
  function Node() {
    _classCallCheck(this, Node);

    this.transition = {};
    this.suffixLink = null;
  }

  _createClass(Node, [{
    key: 'addTransition',
    value: function addTransition(node, _ref, t) {
      var _ref2 = _slicedToArray(_ref, 2);

      var start = _ref2[0];
      var end = _ref2[1];

      this.transition[t] = [node, start, end];
    }
  }, {
    key: 'isLeaf',
    value: function isLeaf() {
      return Object.keys(this.transition).length === 0;
    }
  }]);

  return Node;
})();

var SuffixTree = (function () {
  function SuffixTree() {
    _classCallCheck(this, SuffixTree);

    this.text = '';

    this.root = new Node();
    this.bottom = new Node();
    this.root.suffixLink = this.bottom;

    this.s = this.root;
    this.k = 0;
    this.i = -1;
  }

  _createClass(SuffixTree, [{
    key: 'addString',
    value: function addString(str) {
      var temp = this.text.length;
      this.text += temp ? '⚇' + str : str;

      var s = this.s;
      var k = this.k;
      var i = this.i;

      for (var j = temp; j < this.text.length; j++) {
        this.bottom.addTransition(this.root, [j, j], this.text[j]);
      }

      while (this.text[i + 1]) {
        i++;

        var _update = this.update(s, [k, i]);

        var _update2 = _slicedToArray(_update, 2);

        s = _update2[0];
        k = _update2[1];

        var _canonize = this.canonize(s, [k, i]);

        var _canonize2 = _slicedToArray(_canonize, 2);

        s = _canonize2[0];
        k = _canonize2[1];
      }

      var _ref3 = [s, k, i];
      this.s = _ref3[0];
      this.k = _ref3[1];
      this.i = _ref3[2];

      return this;
    }
  }, {
    key: 'update',
    value: function update(s, _ref4) {
      var _ref42 = _slicedToArray(_ref4, 2);

      var k = _ref42[0];
      var i = _ref42[1];

      var oldr = this.root;

      var _testAndSplit = this.testAndSplit(s, [k, i - 1], this.text[i]);

      var _testAndSplit2 = _slicedToArray(_testAndSplit, 2);

      var endPoint = _testAndSplit2[0];
      var r = _testAndSplit2[1];

      while (!endPoint) {
        r.addTransition(new Node(), [i, Infinity], this.text[i]);

        if (oldr != this.root) {
          oldr.suffixLink = r;
        }

        oldr = r;

        var _canonize3 = this.canonize(s.suffixLink, [k, i - 1]);

        var _canonize32 = _slicedToArray(_canonize3, 2);

        s = _canonize32[0];
        k = _canonize32[1];

        var _testAndSplit3 = this.testAndSplit(s, [k, i - 1], this.text[i]);

        var _testAndSplit32 = _slicedToArray(_testAndSplit3, 2);

        endPoint = _testAndSplit32[0];
        r = _testAndSplit32[1];
      }

      if (oldr != this.root) {
        oldr.suffixLink = s;
      }

      return [s, k];
    }
  }, {
    key: 'testAndSplit',
    value: function testAndSplit(s, _ref5, t) {
      var _ref52 = _slicedToArray(_ref5, 2);

      var k = _ref52[0];
      var p = _ref52[1];

      if (k <= p) {
        var _s$transition$text$k = _slicedToArray(s.transition[this.text[k]], 3);

        var s2 = _s$transition$text$k[0];
        var k2 = _s$transition$text$k[1];
        var p2 = _s$transition$text$k[2];

        if (t == this.text[k2 + p - k + 1]) {
          return [true, s];
        } else {
          var r = new Node();
          s.addTransition(r, [k2, k2 + p - k], this.text[k2]);
          r.addTransition(s2, [k2 + p - k + 1, p2], this.text[k2 + p - k + 1]);
          return [false, r];
        }
      } else {
        if (!s.transition[t]) return [false, s];else return [true, s];
      }
    }
  }, {
    key: 'canonize',
    value: function canonize(s, _ref6) {
      var _ref62 = _slicedToArray(_ref6, 2);

      var k = _ref62[0];
      var p = _ref62[1];

      if (p < k) return [s, k];else {
        var _s$transition$text$k2 = _slicedToArray(s.transition[this.text[k]], 3);

        var s2 = _s$transition$text$k2[0];
        var k2 = _s$transition$text$k2[1];
        var p2 = _s$transition$text$k2[2];

        while (p2 - k2 <= p - k) {
          k = k + p2 - k2 + 1;
          s = s2;

          if (k <= p) {
            var _s$transition$text$k3 = _slicedToArray(s.transition[this.text[k]], 3);

            s2 = _s$transition$text$k3[0];
            k2 = _s$transition$text$k3[1];
            p2 = _s$transition$text$k3[2];
          }
        }

        return [s, k];
      }
    }
  }, {
    key: 'findLongestRepeatedSubstrings',
    value: function findLongestRepeatedSubstrings() {
      var n = arguments[0] === undefined ? 3 : arguments[0];
      var text = this.text;
      var root = this.root;

      var longestSubstrings = [];

      (function traverse(node) {
        var curStr = arguments[1] === undefined ? '' : arguments[1];

        if (node.isLeaf()) return;

        for (var t in node.transition) {
          var _node$transition$t = _slicedToArray(node.transition[t], 3);

          var s = _node$transition$t[0];
          var a = _node$transition$t[1];
          var b = _node$transition$t[2];

          if (!s.isLeaf()) {
            var curCurStr = curStr;
            var curSubStr = text.substring(a, b + 1);
            curCurStr = node === root ? curSubStr : curCurStr + curSubStr;

            longestSubstrings.push(curCurStr);
            traverse(s, curCurStr);
          }
        }
      })(root);

      return longestSubstrings.sort(function (a, b) {
        return b.length - a.length;
      }).slice(0, n);
    }
  }, {
    key: 'toString',
    value: function toString() {
      var text = this.text;

      function traverse(node) {
        var offset = arguments[1] === undefined ? '' : arguments[1];
        var ret = arguments[2] === undefined ? '' : arguments[2];

        for (var t in node.transition) {
          var _node$transition$t2 = _slicedToArray(node.transition[t], 3);

          var s = _node$transition$t2[0];
          var a = _node$transition$t2[1];
          var b = _node$transition$t2[2];

          ret += offset + '["' + text.substring(a, b + 1) + '", ' + a + ', ' + b + ']' + '\r\n';
          ret += traverse(s, offset + '\t');
        }
        return ret;
      }
      var res = traverse(this.root);
      return res;
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this.toString());
    }
  }]);

  return SuffixTree;
})();

exports.SuffixTree = SuffixTree;

