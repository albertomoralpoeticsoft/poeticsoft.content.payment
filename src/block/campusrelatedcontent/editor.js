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
  useEffect,
  useState
} = wp.element
const {
  apiFetch
} = wp
import {
  HeadingSelector
 } from 'blockscommon/elementselector'

import metadata from 'blocks/campusrelatedcontent/block.json'
import './editor.scss';

const includesOptions = [
  {
    label: 'Sólo relacionados',
    value: 'related'
  },
  {
    label: 'Sólo tags',
    value: 'tags'
  },
  {
    label: 'Relacionados y tags',
    value: 'relatedandtags'
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
    sectionHeadingType,
    areaHeadingType,
    includesMode,
    tags,
    mode
  } = attributes;

  const blockProps = useBlockProps()

  const [ availableTags, setAvailableTags ] = useState()
  const [ selectedTags, setSelectedTags ] = useState()

  const selectTags = values => {

    setSelectedTags(values)

    setAttributes({ 
      tags: JSON.stringify(values)
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

    apiFetch({ 
      path: '/wp/v2/tags?per_page=-1' 
    })
    .then(tags => {
      
      setAvailableTags(
        tags.map(
          tag => ({
            label: tag.name,
            value: tag.id.toString()
          })
        )
      )
    })
    
    setSelectedTags(JSON.parse(tags))

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
        <SelectControl
          label="Visualizar"
          value={ includesMode }
          options={ includesOptions }
          onChange={ 
            value => setAttributes({ 
              includesMode: value
            })
          }
        />
        <SelectControl
          label="Tags"
          multiple={ true }
          value={ selectedTags }
          options={ availableTags }
          onChange={ selectTags }
          disabled={ includesMode == 'related' } 
        />  
        <HeadingSelector
          title="Elemento de título de sección"
          value={ sectionHeadingType }
          onChange={
            value => setAttributes({
              sectionHeadingType: value
            })
          }
        />
        <HeadingSelector
          title="Elemento de título de área"
          value={ areaHeadingType }
          onChange={
            value => setAttributes({
              areaHeadingType: value
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
        hs[sectionHeadingType](title)
      }
      <div className="Content">
        {
          hs[areaHeadingType]('Contenidos')
        } 
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