import './editor.scss'

import { v4 as uuidv4 } from 'uuid'
const { 
  registerBlockType 
} = wp.blocks
const { 
  useBlockProps,
  InspectorControls 
} = wp.blockEditor
const {
  useState,
  useEffect
} = wp.element
const {
  PanelBody,
  ToggleControl 
} = wp.components
const { 
  useSelect 
} = wp.data

import metadata from 'blocks/campustreenav/block.json'
import './editor.scss'

const Edit = props => {
  
  const {
    clientId,
    attributes, 
    setAttributes 
  } = props  
  const { 
    blockId,
    refClientId,
    onlySubscriptions,
    showLegend
  } = attributes  
  const blockProps = useBlockProps()

  useEffect(() => {

    if (!blockId) {

      setAttributes({ 
        blockId: uuidv4(),
        refClientId: clientId
      })

    } else {

      if (refClientId !== clientId) {

        setAttributes({ 
          blockId: uuidv4(),
          refClientId: clientId
        })
      }
    }

  }, [])
   
  return <>
    <InspectorControls>
      <PanelBody 
        title={ 'Opciones del Bloque' } 
        initialOpen={ true }
      >        
        <ToggleControl        
          label={ `
            Ver sólo suscripciones 
            (${ onlySubscriptions ? 'SI' : 'NO' })
          `}
          checked={ onlySubscriptions }
          onChange={ 
            value => setAttributes({ 
              onlySubscriptions: value
            })
          }
        />        
        <ToggleControl        
          label={ `
            Ver leyenda 
            (${ showLegend ? 'SI' : 'NO' })
          `}
          checked={ showLegend }
          onChange={ 
            value => setAttributes({ 
              showLegend: value
            })
          }
        />
      </PanelBody>
    </InspectorControls>
    <div { ...blockProps }>
      Navegación del campus
      { onlySubscriptions ? ' (Sólo suscripciones & Libre)' : '' }
      { showLegend ? ' (Con leyenda)' : '' }
    </div>
  </>
}

const Save = () => null

registerBlockType(
  metadata.name,
  {
    edit: Edit,
    save: Save
  }
)