/******/ (() => { // webpackBootstrap
/*!*****************************************!*\
  !*** ./src/ui/edit/coreconfigs/main.js ***!
  \*****************************************/
var createHigherOrderComponent = wp.compose.createHigherOrderComponent;
var InspectorControls = wp.blockEditor.InspectorControls;
var _wp$components = wp.components,
  PanelBody = _wp$components.PanelBody,
  SelectControl = _wp$components.SelectControl;
var addFilter = wp.hooks.addFilter;
var postContentVisibleOptions = [{
  label: 'Visible siempre',
  value: 'visiblealways'
}, {
  label: 'Sólo en contenedores',
  value: 'onlyincontainers'
}];
var withInspectorControls = createHigherOrderComponent(function (BlockEdit) {
  return function (props) {
    if (props.name === 'core/post-content') {
      var attributes = props.attributes,
        setAttributes = props.setAttributes;
      var showpagecontent = attributes.showpagecontent;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
        title: "Contenido restringido",
        initialOpen: true
      }, /*#__PURE__*/React.createElement(SelectControl, {
        label: "Contenido restringido",
        value: showpagecontent,
        options: postContentVisibleOptions,
        onChange: function onChange(value) {
          return setAttributes({
            showpagecontent: value
          });
        }
      }))));
    }
    return /*#__PURE__*/React.createElement(BlockEdit, props);
  };
}, 'withInspectorControls');
addFilter('editor.BlockEdit', 'poeticsoft/coreconfigs', withInspectorControls);
/******/ })()
;
//# sourceMappingURL=main.js.map