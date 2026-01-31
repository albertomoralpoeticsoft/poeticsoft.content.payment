import { v4 as uuidv4 } from 'uuid'
const { 
  registerBlockType 
} = wp.blocks
const { 
  useBlockProps,
  InspectorControls
} = wp.blockEditor
const {
  PanelBody,
  SelectControl 
} = wp.components
const {
  useEffect
} = wp.element

import metadata from 'blocks/mycampus/block.json'
import './editor.scss'; 

const modeOptions = [
  {
    label: 'Completo',
    value: 'complete'
  },
  {
    label: 'Compacto',
    value: 'compact'
  }
]

const Edit = props => {
  
  const {
    clientId,
    attributes, 
    setAttributes 
  } = props  
  const { 
    blockId,
    refClientId,
    mode
  } = attributes;
  const blockProps = useBlockProps()

  const onModeChange = mode => {

    setAttributes({
      mode: mode
    })
  }

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
        className="My Campus"
        title={ 'Opciones del Bloque' } 
        initialOpen={ true }
      >
        <SelectControl
          label="Modo"
          value={ mode }
          options={ modeOptions }
          onChange={ onModeChange }
        />
      </PanelBody>
    </InspectorControls>
    <div { ...blockProps}>
      My Campus ({ 
        modeOptions.find(o => o.value == mode).label
      })
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