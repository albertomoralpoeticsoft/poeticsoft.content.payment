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
  PanelBody
} = wp.components
const {
  useEffect
} = wp.element
import {
  HeadingSelector
 } from 'blockscommon/elementselector'

import metadata from 'blocks/pagecontext/block.json'
import './editor.scss'

const hs = {
  h1: title => <h1 className="Title">{ title }</h1>,
  h2: title => <h2 className="Title">{ title }</h2>,
  h3: title => <h3 className="Title">{ title }</h3>,
  h4: title => <h4 className="Title">{ title }</h4>,
  h5: title => <h5 className="Title">{ title }</h5>,
  h6: title => <h6 className="Title">{ title }</h6>
}

const Edit = props => {
  
  const {
    clientId,
    attributes, 
    setAttributes 
  } = props  
  const { 
    blockId,
    refClientId,
    headingType
  } = attributes  
  const blockProps = useBlockProps()

  const selectHeadingType = value => {

    setAttributes({ 
      headingType: value
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
        className="PageContext"
        title={ 'Opciones del Bloque' } 
        initialOpen={ true }
      >
        <HeadingSelector
          value={ headingType }
          onChange={ selectHeadingType }
        />
      </PanelBody>
    </InspectorControls>
    <div { ...blockProps }>      
      {
        hs[headingType]('Contexto de página')
      }
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