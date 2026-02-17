const { 
  createHigherOrderComponent 
} = wp.compose;
const { 
  InspectorControls,
  RichText  
} = wp.blockEditor;
const { 
  PanelBody,  
  SelectControl
} = wp.components;
const { addFilter } = wp.hooks; 

import './main.scss'

const postContentVisibleOptions = [
  {
    label: 'Oculto siempre',
    value: 'hiddenalways'
  },
  {
    label: 'Visible siempre',
    value: 'visiblealways'
  },
  {
    label: 'Sólo en páginas sin descendientes',
    value: 'onlyincontents'
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
          showrestrictedtext,
          restrictedvisibletext,
          payvisibletext
        } = attributes

        return <>
          <BlockEdit { ...props } />
          <InspectorControls>
            <PanelBody 
              title="Advertencia contenido restringido" 
              initialOpen={ true }
              className="PostContentConfig"
            >        
              <SelectControl
                label="Donde ver advertencia"
                value={ showrestrictedtext }
                options={ postContentVisibleOptions }
                onChange={ 
                  value => setAttributes({ 
                    showrestrictedtext: value 
                  }) 
                }
              />
              <div className="Texts RestrictedText">
                <div className="EditTitle">
                  Texto contenido restringido            
                </div>
                <div className="EditText">
                  <RichText
                    __unstableOnFocus
                    tagName="div"
                    value={ restrictedvisibletext }
                    allowedFormats={[ 
                      'core/bold', 
                      'core/italic' 
                    ]} 
                    onChange={
                      value => setAttributes({
                        restrictedvisibletext: value
                      })
                    }
                    placeholder="Texto contenido restringido"
                  />
                </div>
              </div>
              <div className="Texts PayText">
                <div className="EditTitle">
                  Texto contenido de pago            
                </div>
                <div className="EditText">
                  <RichText
                    __unstableOnFocus
                    tagName="div"
                    value={ payvisibletext }
                    allowedFormats={[ 
                      'core/bold', 
                      'core/italic' 
                    ]} 
                    onChange={
                      value => setAttributes({
                        payvisibletext: value
                      })
                    }
                    placeholder="Texto contenido restringido"
                  />
                </div>                
                <div className="Help">
                  { 'Variables: {suscriptionduration}, {price}, {currency}' }            
                </div>
              </div>
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