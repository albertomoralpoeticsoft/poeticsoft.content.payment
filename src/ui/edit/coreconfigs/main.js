const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.blockEditor;
const { 
  PanelBody,  
  SelectControl
} = wp.components;
const { addFilter } = wp.hooks; 

const postContentVisibleOptions = [
  {
    label: 'Visible siempre',
    value: 'visiblealways'
  },
  {
    label: 'Sólo en contenedores',
    value: 'onlyincontainers'
  }
]

const withInspectorControls = createHigherOrderComponent(  
  BlockEdit => {

    return ( props ) => {
      
      if (props.name === 'core/post-content') {

        const { 
          attributes, 
          setAttributes 
        } = props;
        const {
          showpagecontent
        } = attributes

        return <>
          <BlockEdit { ...props } />
          <InspectorControls>
            <PanelBody 
              title="Contenido restringido" 
              initialOpen={ true }
            >
              <SelectControl
                label="Contenido restringido"
                value={ showpagecontent }
                options={ postContentVisibleOptions }
                onChange={ 
                  value => setAttributes({ 
                    showpagecontent: value 
                  }) 
                }
              />
            </PanelBody>
          </InspectorControls>
        </>
      }
      
      return <BlockEdit { ...props } />;
    };
  }, 
  'withInspectorControls' 
);

addFilter(
  'editor.BlockEdit',
  'poeticsoft/coreconfigs',
  withInspectorControls
);