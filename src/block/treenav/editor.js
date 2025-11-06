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

import metadata from 'blocks/treenav/block.json'
import './editor.scss'

const TreePage = page => {

  return page ?
  <div className="Page">
    <div className="Title">
      { page.title }
    </div>
    {
      page.children &&
      page.children.length ?
      <div className="Pages">
        {
          page.children.map(p => <TreePage { ...p } />)
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

      setAttributes({ blockId: uuidv4() })
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
        .map(p => <TreePage { ...p } />)
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