import { v4 as uuidv4 } from 'uuid'
const { 
  registerBlockType 
} = wp.blocks
const { 
  useBlockProps,
  InspectorControls,
  RichText 
} = wp.blockEditor
const {
  PanelBody,
  SelectControl 
} = wp.components
const {
  useEffect
} = wp.element
import {
  HeadingSelector
 } from 'blockscommon/elementselector'

import metadata from 'blocks/campuscontainerchildren/block.json'
import './editor.scss'; 

const contentsOptions = [
  {
    label: 'Todo visible para todos',
    value: 'all'
  },
  {
    label: 'Todo visible para identificados',
    value: 'allidentified'
  },
  {
    label: 'Suscripciones & Libre',
    value: 'subscriptionsandfree'
  },
]

const modeOptions = [
  {
    label: 'Título, Imagen & Extracto',
    value: 'complete'
  },
  {
    label: 'Sólo título',
    value: 'compact'
  }
]

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
    title,
    headingType,
    contents,
    mode
  } = attributes;
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
        title="Opciones del Bloque"
        initialOpen={ true }
      > 
        <div className="
          campuscontainerchildren
          SeccionTitle
        ">
          <div className="EditTitle">
            Titulo de sección            
          </div>
          <div className="EditText">
            <RichText
              tagName="div"
              value={ title }
              allowedFormats={[ 
                'core/bold', 
                'core/italic' 
              ]} 
              onChange={
                value => setAttributes({
                  title: value
                })
              }
              placeholder="Título"
            />
          </div>
        </div>
        <HeadingSelector
          value={ headingType }
          onChange={
            value => setAttributes({
              headingType: value
            })
          }
        />
        <SelectControl
          label="Visualizar"
          value={ contents }
          options={ contentsOptions }
          onChange={ 
            value => setAttributes({ 
              contents: value
            })
          }
        />
        <SelectControl
          label="Modo"
          value={ mode }
          options={ modeOptions }
          onChange={ 
            value => setAttributes({ 
              mode: value
            })
          }
        />
      </PanelBody>
    </InspectorControls>
    <div { ...blockProps}>
      {
        hs[headingType](title)
      }
      <div className="Content">
        Descendientes directos de esta página - 
        { 
          modeOptions.find(o => o.value == mode).label
        }
      </div>
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