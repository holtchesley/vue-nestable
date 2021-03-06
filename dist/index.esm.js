/*!
 * @holtchesley/vue-nestable v2.6.1
 * (c) Ralph Huwiler <ralph@huwiler.rocks>
 * Released under the MIT License.
 */
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.mjs';
import update from 'immutability-helper';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var store = {};
var groupsObserver = {
  methods: {
    registerNestable: function registerNestable(nestable) {
      var storeGroup = this._getByGroup(nestable.group);

      storeGroup.onDragStartListeners.push(nestable.onDragStart);
      storeGroup.onMouseEnterListeners.push(nestable.onMouseEnter);
      storeGroup.onMouseMoveListeners.push(nestable.onMouseMove);
    },
    notifyDragStart: function notifyDragStart(group, event, item) {
      var storeGroup = this._getByGroup(group);

      var _iterator = _createForOfIteratorHelper(storeGroup.onDragStartListeners),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var listener = _step.value;
          listener(event, item);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    notifyMouseEnter: function notifyMouseEnter(group, event, eventList, item) {
      var storeGroup = this._getByGroup(group);

      var _iterator2 = _createForOfIteratorHelper(storeGroup.onMouseEnterListeners),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var listener = _step2.value;
          listener(event, eventList, item);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    },
    notifyMouseMove: function notifyMouseMove(group, event) {
      var storeGroup = this._getByGroup(group);

      var _iterator3 = _createForOfIteratorHelper(storeGroup.onMouseMoveListeners),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var listener = _step3.value;
          listener(event);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    },
    _getByGroup: function _getByGroup(group) {
      // the group already exists, return the reference
      if (store[group]) {
        return store[group];
      } // otherwise create a new object for the group


      store[group] = {
        onDragStartListeners: [],
        onMouseEnterListeners: [],
        onMouseMoveListeners: [],
        onDragStart: [],
        dragItem: null
      };
      return store[group];
    }
  }
};

var script = {
  name: 'NestableItem',
  mixins: [groupsObserver],
  props: {
    item: {
      type: Object,
      required: true,
      default: function _default() {
        return {};
      }
    },
    index: {
      type: Number,
      required: false,
      default: null
    },
    isChild: {
      type: Boolean,
      required: false,
      default: false
    },
    isCopy: {
      type: Boolean,
      required: false,
      default: false
    },
    options: {
      type: Object,
      required: true,
      default: function _default() {
        return {};
      }
    }
  },
  inject: ['listId', 'group', 'keyProp'],
  data: function data() {
    return {
      breakPoint: null,
      moveDown: false
    };
  },
  computed: {
    isDragging: function isDragging() {
      var dragItem = this.options.dragItem;
      return !this.isCopy && dragItem && dragItem[this.options.keyProp] === this.item[this.options.keyProp];
    },
    hasChildren: function hasChildren() {
      return this.item[this.options.childrenProp] && this.item[this.options.childrenProp].length > 0;
    },
    hasHandle: function hasHandle() {
      return !!this.$scopedSlots.handler;
    },
    normalizedClassProp: function normalizedClassProp() {
      var classProp = this.item[this.options.classProp]; // if the classprop is not set, return an empty array

      if (!classProp) return [];

      if (Array.isArray(classProp)) {
        return classProp;
      } else if ((typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object') {
        return [classProp];
      } else {
        // String value
        return [classProp];
      }
    },
    itemClasses: function itemClasses() {
      var isDragging = this.isDragging ? ['is-dragging'] : [];
      return ["nestable-item".concat(this.isCopy ? '-copy' : ''), "nestable-item".concat(this.isCopy ? '-copy' : '', "-").concat(this.item[this.options.keyProp])].concat(isDragging, _toConsumableArray(this.normalizedClassProp));
    }
  },
  methods: {
    onMouseEnter: function onMouseEnter(event) {
      if (!this.options.dragItem) return; // if we don't know the direction the mouse is moving,
      // we can not calculate the offset at which we should trigger a swap
      // we we fallback to the old behavior

      if (!event.movementY) {
        return this.sendNotification(event);
      } // when the mouse enters the item we save the size of this item
      // is is to improve performance, so we do not recalculate the size on every move


      this.moveDown = event.movementY > 0;
      this.breakPoint = event.target.getBoundingClientRect().height / 2;
    },
    onMouseLeave: function onMouseLeave() {
      this.breakPoint = null;
    },
    onMouseMove: function onMouseMove(event) {
      // if we are not in a drag operation, we can discard the input
      if (!this.breakPoint) return; // calculate how much the mouse is away from the center

      var delta = event.offsetY - this.breakPoint; // if we have not reached the breakpoint, we can abort here

      if (this.moveDown && delta < this.breakPoint / 4) return;
      if (!this.moveDown && delta > -this.breakPoint / 4) return;
      this.sendNotification(event);
    },
    sendNotification: function sendNotification(event) {
      // reset the calculated breakpoint
      this.breakPoint = null; // and trigger the enter event

      var item = this.item || this.$parent.item;
      this.notifyMouseEnter(this.group, event, this.listId, item);
    }
  }
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('li', {
    class: _vm.itemClasses
  }, [_c('div', {
    staticClass: "nestable-item-content",
    on: {
      "mouseenter": _vm.onMouseEnter,
      "mouseleave": _vm.onMouseLeave,
      "mousemove": _vm.onMouseMove
    }
  }, [_vm._t("default", null, {
    "index": _vm.index,
    "item": _vm.item,
    "isChild": _vm.isChild
  })], 2), _vm._v(" "), _vm.hasChildren ? _c('ol', {
    staticClass: "nestable-list"
  }, [_vm._l(_vm.item[_vm.options.childrenProp], function (child, childIndex) {
    return [_c('NestableItem', {
      key: child[_vm.keyProp],
      attrs: {
        "item": child,
        "index": childIndex,
        "options": _vm.options,
        "is-copy": _vm.isCopy,
        "is-child": ""
      },
      scopedSlots: _vm._u([_vm._l(Object.keys(_vm.$scopedSlots), function (slot) {
        return {
          key: slot,
          fn: function fn(scope) {
            return [_vm._t(slot, null, null, scope)];
          }
        };
      })], null, true)
    })];
  })], 2) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/__vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

//
var script$1 = {
  name: 'Placeholder',
  mixins: [groupsObserver],
  props: {
    index: {
      type: Number,
      required: false,
      default: null
    },
    options: {
      type: Object,
      required: false,
      default: function _default() {
        return {};
      }
    }
  },
  inject: ['listId', 'group'],
  computed: {
    isDragging: function isDragging() {
      var dragItem = this.options.dragItem;
      return dragItem;
    }
  },
  methods: {
    onMouseEnter: function onMouseEnter(event) {
      if (!this.options.dragItem) return;
      this.notifyMouseEnter(this.group, event, this.listId, null);
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('li', [_c('div', {
    staticClass: "nestable-list-empty",
    on: {
      "mouseenter": _vm.onMouseEnter
    }
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/__vue_normalize__({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

var nestableHelpers = {
  methods: {
    // ––––––––––––––––––––––––––––––––––––
    // Getter methods
    // ––––––––––––––––––––––––––––––––––––
    getPathById: function getPathById(id) {
      var _this = this;

      var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value;
      var path = [];
      items.every(function (item, i) {
        if (item[_this.keyProp] === id) {
          path.push(i);
        } else if (item[_this.childrenProp]) {
          var childrenPath = _this.getPathById(id, item[_this.childrenProp]);

          if (childrenPath.length) {
            path = path.concat(i).concat(childrenPath);
          }
        }

        return path.length === 0;
      });
      return path;
    },
    getItemByPath: function getItemByPath(path) {
      var _this2 = this;

      var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value;
      var item = null;
      path.forEach(function (index) {
        var list = item && item[_this2.childrenProp] ? item[_this2.childrenProp] : items;
        item = list[index];
      });
      return item;
    },
    getItemDepth: function getItemDepth(item) {
      var level = 1;

      if (item[this.childrenProp] && item[this.childrenProp].length > 0) {
        var childrenDepths = item[this.childrenProp].map(this.getItemDepth);
        level += Math.max.apply(Math, _toConsumableArray(childrenDepths));
      }

      return level;
    },
    getSplicePath: function getSplicePath(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var splicePath = {};
      var numToRemove = options.numToRemove || 0;
      var itemsToInsert = options.itemsToInsert || [];
      var lastIndex = path.length - 1;
      var currentPath = splicePath;
      path.forEach(function (index, i) {
        if (i === lastIndex) {
          currentPath.$splice = [[index, numToRemove].concat(_toConsumableArray(itemsToInsert))];
        } else {
          var nextPath = {};
          currentPath[index] = _defineProperty({}, options.childrenProp, nextPath);
          currentPath = nextPath;
        }
      });
      return splicePath;
    },
    getRealNextPath: function getRealNextPath(prevPath, nextPath) {
      var ppLastIndex = prevPath.length - 1;
      var npLastIndex = nextPath.length - 1;

      if (prevPath.length < nextPath.length) {
        // move into deep
        var wasShifted = false;
        return nextPath.map(function (nextIndex, i) {
          if (wasShifted) {
            return i === npLastIndex ? nextIndex + 1 : nextIndex;
          }

          if (typeof prevPath[i] !== 'number') {
            return nextIndex;
          }

          if (nextPath[i] > prevPath[i] && i === ppLastIndex) {
            wasShifted = true;
            return nextIndex - 1;
          }

          return nextIndex;
        });
      } else if (prevPath.length === nextPath.length) {
        // if move bottom + move to item with children => make it a first child instead of swap
        if (nextPath[npLastIndex] > prevPath[npLastIndex]) {
          var target = this.getItemByPath(nextPath);

          if (target[this.childrenProp] && target[this.childrenProp].length && !this.isCollapsed(target)) {
            return nextPath.slice(0, -1).concat(nextPath[npLastIndex] - 1).concat(0);
          }
        }
      }

      return nextPath;
    } // getItemOptions() {
    //   const { renderItem, renderCollapseIcon, handler, childrenProp } = this.props;
    //   const { dragItem } = this.state;
    //   return {
    //     dragItem,
    //     childrenProp,
    //     renderItem,
    //     renderCollapseIcon,
    //     handler,
    //     onDragStart: this.onDragStart,
    //     onMouseEnter: this.onMouseEnter,
    //     isCollapsed: this.isCollapsed,
    //     onToggleCollapse: this.onToggleCollapse
    //   };
    // }

  }
};

var callsHooks = {
  methods: {
    hook: function hook(name, params) {
      // If the hook has not been registered,
      // we consider the hook as successful
      if (!this.hooks[name]) return true;
      var result = this.hooks[name](params); // If the hook does not return anything,
      // we also consider it true

      return result || result === undefined;
    }
  }
};

var closest = function closest(target, selector) {
  return target.closest(selector);
};
var getOffsetRect = function getOffsetRect(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: Math.round(box.top),
    left: Math.round(box.left)
  };
};
var getTransformProps = function getTransformProps(x, y) {
  return {
    transform: 'translate(' + x + 'px, ' + y + 'px)'
  };
};
var listWithChildren = function listWithChildren(list, childrenProp) {
  return list.map(function (item) {
    return _objectSpread2(_objectSpread2({}, item), {}, _defineProperty({}, childrenProp, item[childrenProp] ? listWithChildren(item[childrenProp], childrenProp) : []));
  });
};

var script$2 = {
  name: 'VueNestable',
  components: {
    NestableItem: __vue_component__,
    Placeholder: __vue_component__$1
  },
  mixins: [nestableHelpers, groupsObserver, callsHooks],
  props: {
    value: {
      type: Array,
      required: true,
      default: function _default() {
        return [];
      }
    },
    threshold: {
      type: Number,
      required: false,
      default: 30
    },
    maxDepth: {
      type: Number,
      required: false,
      default: 10
    },
    keyProp: {
      type: String,
      required: false,
      default: 'id'
    },
    classProp: {
      type: String,
      required: false,
      default: null
    },
    group: {
      type: [String, Number],
      required: false,
      default: function _default() {
        return Math.random().toString(36).slice(2);
      }
    },
    childrenProp: {
      type: String,
      required: false,
      default: 'children'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsedGroups: {
      type: Array,
      required: false,
      default: function _default() {
        return [];
      }
    },
    hooks: {
      type: Object,
      required: false,
      default: function _default() {
        return {};
      }
    },
    rtl: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  provide: function provide() {
    return {
      listId: this.listId,
      group: this.group,
      keyProp: this.keyProp,
      onDragEnd: this.onDragEnd
    };
  },
  data: function data() {
    return {
      itemsOld: null,
      // revert to copy in case of cancelling drag
      dragItem: null,
      mouse: {
        last: {
          x: 0
        },
        shift: {
          x: 0
        }
      },
      el: null,
      elCopyStyles: null,
      isDirty: false,
      listId: Math.random().toString(36).slice(2)
    };
  },
  computed: {
    listIsEmpty: function listIsEmpty() {
      return this.value.length === 0;
    },
    itemOptions: function itemOptions() {
      return {
        dragItem: this.dragItem,
        keyProp: this.keyProp,
        classProp: this.classProp,
        childrenProp: this.childrenProp
      };
    },
    listStyles: function listStyles() {
      var el = document.querySelector('.nestable-' + this.group + ' .nestable-item-' + this.dragItem[this.keyProp]);
      var listStyles = {};

      if (el) {
        listStyles.width = "".concat(el.clientWidth, "px");
      }

      if (this.elCopyStyles) {
        listStyles = _objectSpread2(_objectSpread2({}, listStyles), this.elCopyStyles);
      }

      return listStyles;
    }
  },
  created: function created() {
    var items = listWithChildren(this.value, this.childrenProp);
    this.$emit('input', items);
    this.isDirty = false;
    this.registerNestable(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.stopTrackMouse();
  },
  methods: {
    startTrackMouse: function startTrackMouse() {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onDragEnd);
      document.addEventListener('touchend', this.onDragEnd);
      document.addEventListener('touchcancel', this.onDragEnd);
      document.addEventListener('keydown', this.onKeyDown);
    },
    stopTrackMouse: function stopTrackMouse() {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onDragEnd);
      document.removeEventListener('touchend', this.onDragEnd);
      document.removeEventListener('touchcancel', this.onDragEnd);
      document.removeEventListener('keydown', this.onKeyDown);
      this.elCopyStyles = null;
    },
    onDragStart: function onDragStart(event, item) {
      var _this = this;

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.el = closest(event.target, '.nestable-item');
      this.startTrackMouse();
      this.dragItem = item;
      this.itemsOld = this.value; // Trigger a mouseMove event to update the ghost item with the mouse
      // position

      this.$nextTick(function () {
        _this.onMouseMove(event);
      });
    },
    onDragEnd: function onDragEnd(event, isCancel) {
      event && event.preventDefault();
      this.stopTrackMouse();
      this.el = null;
      isCancel ? this.dragRevert() : this.dragApply();
    },
    onKeyDown: function onKeyDown(event) {
      if (event.which === 27) {
        // ESC
        this.onDragEnd(null, true);
      }
    },
    getXandYFromEvent: function getXandYFromEvent(event) {
      var clientX = event.clientX,
          clientY = event.clientY; // get touch event

      var targetTouches = event.targetTouches; // if there is a touch event, use this

      if (targetTouches) {
        var touch = targetTouches[0];
        clientX = touch.clientX;
        clientY = touch.clientY; // we rely on the mouseenter event to track if a node should be moved
        // since this event does not exist, we need to simulate it.

        var _event = new Event('mouseenter');

        var element = document.elementFromPoint(clientX, clientY);
        var touchElement = element && (element.closest('.nestable-item-content') || element.closest('.nestable-list-empty'));
        if (touchElement) touchElement.dispatchEvent(_event);
      }

      return {
        clientX: clientX,
        clientY: clientY
      };
    },
    onMouseMove: function onMouseMove(event) {
      event && event.preventDefault();

      var _this$getXandYFromEve = this.getXandYFromEvent(event),
          clientX = _this$getXandYFromEve.clientX,
          clientY = _this$getXandYFromEve.clientY; // initialize the initial mouse positoin on the first drag operation


      if (this.mouse.last.x === 0) {
        this.mouse.last.x = clientX;
      }

      var transformProps = getTransformProps(clientX, clientY); // In some cases the drag-layer might not be at the top left of the window,
      // we need to find, where it acually is, and incorperate the position into the calculation.

      var elDragLayer = document.querySelector('.nestable-' + this.group + ' .nestable-drag-layer');
      if (!elDragLayer) return;

      var _elDragLayer$getBound = elDragLayer.getBoundingClientRect(),
          dragLayerTop = _elDragLayer$getBound.top,
          dragLayerLeft = _elDragLayer$getBound.left;

      var elCopy = document.querySelector('.nestable-' + this.group + ' .nestable-drag-layer > .nestable-list');

      if (!this.elCopyStyles) {
        var offset = getOffsetRect(this.el);
        this.elCopyStyles = _objectSpread2({
          marginTop: "".concat(offset.top - clientY - dragLayerTop, "px"),
          marginLeft: "".concat(offset.left - clientX - dragLayerLeft, "px")
        }, transformProps);
      } else {
        this.elCopyStyles = _objectSpread2(_objectSpread2({}, this.elCopyStyles), transformProps);

        if (elCopy) {
          for (var key in transformProps) {
            if (Object.prototype.hasOwnProperty.call(transformProps, key)) {
              elCopy.style[key] = transformProps[key];
            }
          }
        }

        var diffX = this.rtl ? this.mouse.last.x - clientX : clientX - this.mouse.last.x;

        if (diffX >= 0 && this.mouse.shift.x >= 0 || diffX <= 0 && this.mouse.shift.x <= 0) {
          this.mouse.shift.x += diffX;
        } else {
          this.mouse.shift.x = 0;
        }

        this.mouse.last.x = clientX;

        if (Math.abs(this.mouse.shift.x) > this.threshold) {
          if (this.mouse.shift.x > 0) {
            this.tryIncreaseDepth(this.dragItem);
          } else {
            this.tryDecreaseDepth(this.dragItem);
          }

          this.mouse.shift.x = 0;
        }
      }
    },
    moveItem: function moveItem(_ref) {
      var dragItem = _ref.dragItem,
          pathFrom = _ref.pathFrom,
          pathTo = _ref.pathTo;
      // the remove action might affect the next position,
      // so update next coordinates accordingly
      var realPathTo = this.getRealNextPath(pathFrom, pathTo);
      var removePath = this.getSplicePath(pathFrom, {
        numToRemove: 1,
        childrenProp: this.childrenProp
      });
      var insertPath = this.getSplicePath(realPathTo, {
        numToRemove: 0,
        itemsToInsert: [dragItem],
        childrenProp: this.childrenProp
      });
      if (!this.hook('beforeMove', {
        dragItem: dragItem,
        pathFrom: pathFrom,
        pathTo: realPathTo
      })) return;
      var items = this.value;
      items = update(items, removePath);
      items = update(items, insertPath);
      this.isDirty = true;
      this.pathTo = realPathTo;
      this.$emit('input', items);
    },
    tryIncreaseDepth: function tryIncreaseDepth(dragItem) {
      var pathFrom = this.getPathById(dragItem[this.keyProp]);
      var itemIndex = pathFrom[pathFrom.length - 1];
      var newDepth = pathFrom.length + this.getItemDepth(dragItem); // has previous sibling and isn't at max depth

      if (itemIndex > 0 && newDepth <= this.maxDepth) {
        var prevSibling = this.getItemByPath(pathFrom.slice(0, -1).concat(itemIndex - 1)); // previous sibling is not collapsed

        if (prevSibling[this.childrenProp] && (!prevSibling[this.childrenProp].length || !this.isCollapsed(prevSibling))) {
          var pathTo = pathFrom.slice(0, -1).concat(itemIndex - 1).concat(prevSibling[this.childrenProp].length); // if collapsed by default
          // and was no children here
          // open this node
          // let collapseProps = {};
          // if (collapsed && !prevSibling[this.childrenProp].length) {
          //   collapseProps = this.onToggleCollapse(prevSibling, true);
          // }
          // this.moveItem({ dragItem, pathFrom, pathTo }, collapseProps)

          this.moveItem({
            dragItem: dragItem,
            pathFrom: pathFrom,
            pathTo: pathTo
          });
        }
      }
    },
    tryDecreaseDepth: function tryDecreaseDepth(dragItem) {
      var pathFrom = this.getPathById(dragItem[this.keyProp]);
      var itemIndex = pathFrom[pathFrom.length - 1]; // has parent

      if (pathFrom.length > 1) {
        var parent = this.getItemByPath(pathFrom.slice(0, -1)); // is last (by order) item in array

        if (itemIndex + 1 === parent[this.childrenProp].length) {
          var pathTo = pathFrom.slice(0, -1);
          pathTo[pathTo.length - 1] += 1; // if collapsed by default
          // and is last (by count) item in array
          // remove this node from list of open nodes
          // let collapseProps = {};
          // if (collapsed && parent[this.childrenProp].length == 1) {
          //   collapseProps = this.onToggleCollapse(parent, true);
          // }
          // this.moveItem({ dragItem, pathFrom, pathTo }, collapseProps)

          this.moveItem({
            dragItem: dragItem,
            pathFrom: pathFrom,
            pathTo: pathTo
          });
        }
      }
    },
    onMouseEnter: function onMouseEnter(event, eventList, item) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      var dragItem = this.dragItem; // In some cases, this event fires after the drag operation was already
      // completed, in which case we can ignore it

      if (!dragItem) return; // if the event does not have a valid item that belongs to this list, ignore it

      if (item !== null && dragItem[this.keyProp] === item[this.keyProp]) return; // calculate the path the item is comming from

      var pathFrom = this.getPathById(dragItem[this.keyProp]); // if the event is not emitted from this list and the item was not removed from this list,
      // we can ignore this event

      if (eventList !== this.listId && pathFrom.length === 0) return;
      var pathTo; // if we are dragging to an empty list, we need to remove
      // the item from the origin list and append it to the start of the new list

      if (item === null) {
        pathTo = pathFrom.length > 0 ? [] : [0];
      } else {
        pathTo = this.getPathById(item[this.keyProp]);
      } // if the move to the new depth is greater than max depth,
      // don't move


      var newDepth = this.getRealNextPath(pathFrom, pathTo).length + (this.getItemDepth(dragItem) - 1);

      if (newDepth > this.maxDepth) {
        return;
      } // if collapsed by default
      // and move last (by count) child
      // remove parent node from list of open nodes


      var collapseProps = {};

      if (this.collapsed && pathFrom.length > 1) {
        var parent = this.getItemByPath(pathFrom.slice(0, -1));

        if (parent[this.childrenProp].length === 1) {
          collapseProps = this.onToggleCollapse(parent, true);
        }
      }

      this.moveItem({
        dragItem: dragItem,
        pathFrom: pathFrom,
        pathTo: pathTo
      }, collapseProps);
    },
    isCollapsed: function isCollapsed(item) {
      return !!(this.collapsedGroups.indexOf(item[this.keyProp]) > -1 ^ this.collapsed);
    },
    dragApply: function dragApply() {
      this.$emit('change', this.dragItem, {
        items: this.value,
        pathTo: this.pathTo
      });
      this.pathTo = null;
      this.itemsOld = null;
      this.dragItem = null;
      this.isDirty = false;
    },
    dragRevert: function dragRevert() {
      this.$emit('input', this.itemsOld);
      this.pathTo = null;
      this.itemsOld = null;
      this.dragItem = null;
      this.isDirty = false;
    }
  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: ['nestable', "nestable-" + _vm.group, _vm.rtl ? 'nestable-rtl' : '']
  }, [_c('ol', {
    staticClass: "nestable-list nestable-group"
  }, [_vm.listIsEmpty ? _c('Placeholder', {
    attrs: {
      "options": _vm.itemOptions
    }
  }, [_vm._t("placeholder", [_vm._v("\n        No content\n      ")])], 2) : _vm._e(), _vm._v(" "), _vm._l(_vm.value, function (item, index) {
    return [_c('NestableItem', {
      key: item[_vm.keyProp],
      attrs: {
        "index": index,
        "item": item,
        "options": _vm.itemOptions
      },
      scopedSlots: _vm._u([_vm._l(Object.keys(_vm.$scopedSlots), function (slot) {
        return {
          key: slot,
          fn: function fn(scope) {
            return [_vm._t(slot, null, null, scope)];
          }
        };
      })], null, true)
    })];
  })], 2), _vm._v(" "), _vm.dragItem ? [_c('div', {
    staticClass: "nestable-drag-layer"
  }, [_c('ol', {
    staticClass: "nestable-list",
    style: _vm.listStyles
  }, [_c('NestableItem', {
    attrs: {
      "item": _vm.dragItem,
      "options": _vm.itemOptions,
      "is-copy": true
    },
    scopedSlots: _vm._u([_vm._l(Object.keys(_vm.$scopedSlots), function (slot) {
      return {
        key: slot,
        fn: function fn(scope) {
          return [_vm._t(slot, null, null, scope)];
        }
      };
    })], null, true)
  })], 1)])] : _vm._e()], 2);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/__vue_normalize__({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

//
var script$3 = {
  name: 'VueNestableHandle',
  mixins: [groupsObserver],
  props: {
    item: {
      type: Object,
      required: false,
      default: function _default() {
        return {};
      }
    }
  },
  inject: ['group', 'onDragEnd'],
  methods: {
    dragstart: function dragstart(event) {
      var item = this.item || this.$parent.item;
      this.notifyDragStart(this.group, event, item);
    },
    touchend: function touchend(event) {
      this.onDragEnd(event);
    },
    touchmove: function touchmove(event) {
      this.notifyMouseMove(this.group, event);
    }
  }
};

/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "nestable-handle",
    attrs: {
      "draggable": ""
    },
    on: {
      "dragstart": _vm.dragstart,
      "touchstart": _vm.dragstart,
      "touchend": _vm.touchend,
      "touchmove": _vm.touchmove
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = undefined;
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/__vue_normalize__({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

var index = {
  install: function install(Vue, options) {
    Vue.component('VueNestable', __vue_component__$2);
    Vue.component('VueNestableHandle', __vue_component__$3);
  }
};

export default index;
export { __vue_component__$2 as VueNestable, __vue_component__$3 as VueNestableHandle };
