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
    onlysubscriptions
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
            (${ onlysubscriptions ? 'SI' : 'NO' })
          `}
          checked={ onlysubscriptions }
          onChange={ 
            value => setAttributes({ 
              onlysubscriptions: value
            })
          }
        />
      </PanelBody>
    </InspectorControls>
    <div { ...blockProps }>
      Navegación del campus
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