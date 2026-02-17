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
  ToggleControl 
} = wp.components
const {
  useEffect
} = wp.element
import {
  LinkSelector
 } from 'blockscommon/elementselector'

import metadata from 'blocks/mytools/block.json'
import './editor.scss';

const Link = props => {

  switch(props.linkType) {

    case 'button':

      return <button 
        class="
          wp-block-button__link 
          wp-element-button
        "
      >
        <a href="#">
          SALIR
        </a>
      </button>

      break;

    case 'link':

      return <a href="#">
        SALIR
      </a>

      break;

    default:

      return <a href="#">
        SALIR
      </a>

      break;
  }
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
    linkType,
    idVisible
  } = attributes;
  const blockProps = useBlockProps()

  const selectLinkType = value => {

    setAttributes({ 
      linkType: value
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
        className="MyTools"
        title={ 'Opciones del Bloque' } 
        initialOpen={ true }
      >
        <ToggleControl        
          label={ `Identificación visible? ${ idVisible ? 'SI' : 'NO' }` }
          checked={ idVisible }
          onChange={ 
            value => setAttributes({ 
              idVisible: value
            })
          }
        />
        <LinkSelector
          value={ linkType }
          onChange={ selectLinkType }
        />
      </PanelBody>
    </InspectorControls>
    <div { ...blockProps}>
      {
        idVisible ?
        <span class="Identify">
          identificación
        </span>
        :
        ''
      }
      <Link linkType={ linkType } />
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