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

import { 
  PageSelector
} from './pageselector';

import metadata from 'blocks/pagenav/block.json'
import './editor.scss'

const hs = {
  h1: title => <h1 className="Title">{ title }</h1>,
  h2: title => <h2 className="Title">{ title }</h2>,
  h3: title => <h3 className="Title">{ title }</h3>,
  h4: title => <h4 className="Title">{ title }</h4>,
  h5: title => <h5 className="Title">{ title }</h5>,
  h6: title => <h6 className="Title">{ title }</h6>
}

const TreePage = props => {

  const h = 'h' + (props.level + 1)

  return props ?
  <div className="Page">
    {
      hs[h](props.title)
    }
    <div 
      className="Excerpt"
      dangerouslySetInnerHTML={{
        __html: props.excerpt
      }}
    />
    {
      props.children &&
      props.children.length ?
      <div className="Pages">
        {
          props.children.map(p => <TreePage 
            level={ props.level + 1 } 
            { ...p } 
          />)
        }
      </div>
      :
      <></>
    }
  </div>
  :
  <></>
}
    
const buildPageTree = (
  pagesList, 
  parent=0
) => {

  return pagesList
  .filter(p => p.parent == parent)
  .map(p => ({
    title: p.title.rendered,
    excerpt: p.excerpt.rendered,
    children: buildPageTree(pagesList, p.id)
  }))
}

const Edit = props => {
  
  const {
    attributes, 
    setAttributes 
  } = props  
  const { 
    blockId,
    treerootid
  } = attributes  
  const blockProps = useBlockProps()
  const [ selectedTreePages, setSelectedTreePages ] = useState(null)
    
  const pagesList = useSelect(
    select => {

      let sitepages = select('core')
      .getEntityRecords(
        'postType', 
        'page', 
        { per_page: -1 }
      )

      return sitepages &&
      sitepages.sort((a, b) => (a.menu_order - b.menu_order))
    }, 
    []
  )

  useEffect(() => {

    if(
      pagesList 
      &&
      treerootid != null
    ) {

      const tree = buildPageTree(
        pagesList,
        treerootid
      )

      setSelectedTreePages(tree)
    }

  }, [ pagesList, treerootid ])

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
        <PageSelector
          attributes={  attributes }
          setAttributes={ setAttributes }
          pagesList={ pagesList }
        />
      </PanelBody>
    </InspectorControls>
    <div { ...blockProps }>
      {
        treerootid != null && 
        selectedTreePages &&
        selectedTreePages.length ?
        selectedTreePages
        .map(p => <TreePage 
          level={ 0 }
          { ...p } 
        />)
        :
        <div className="NoTree">
          Selecciona Root
        </div>
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