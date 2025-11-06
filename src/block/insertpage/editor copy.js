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
import { 
  useFeaturedImage
} from './usefeatured';

import metadata from 'blocks/insertpage/block.json'
import './editor.scss'

const Edit = props => {
  
  const {
    attributes, 
    setAttributes 
  } = props  
  const { 
    blockId,
    pageid, 
    showthumb, 
    showtitle, 
    showexcerpt, 
    showcontent
  } = attributes  
  const blockProps = useBlockProps()
  const [ page, setPage ] = useState(null)
  const featured = useFeaturedImage(pageid)
  const thisPageId = useSelect(
    select => select('core/editor')
    .getCurrentPostId(), 
    []
  )

  useSelect(
    select => {

      if (!pageid) return null;

      setPage(
        select('core')
        .getEntityRecord(
          'postType', 
          'page', 
          pageid
        )
      )
    },
    [pageid]
  )

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
          thisPageId={ thisPageId }
          attributes={  attributes }
          setAttributes={ setAttributes }
          setPage={ setPage }
        />
        <ToggleControl
          label={ 'Mostrar Miniatura' }
          checked={!!showthumb}
          onChange={
            value  => setAttributes({ 
              showthumb: value 
            })
          }
        />
        <ToggleControl
          label={ 'Mostrar Título' }
          checked={ !!showtitle }
          onChange={
            value  => setAttributes({
              showtitle: value 
            })
          }
        />
        <ToggleControl
          label={ 'Mostrar Extracto' }
          checked={!!showexcerpt}
          onChange={
            value  => setAttributes({ 
              showexcerpt: value 
            })
          }
        />
        <ToggleControl
          label={ 'Mostrar Contenido' }
          checked={!!showcontent}
          onChange={
            value  => setAttributes({ 
              showcontent: value 
            })
          }
        />
      </PanelBody>
    </InspectorControls>
    <div { ...blockProps }>
      {
        !page &&
        <div className="NoPage">
          No page
        </div>
      }
      {
        !showthumb &&
        !showtitle &&
        !showexcerpt &&
        !showcontent &&
        <div className="NoContents">
          No contents
        </div>
      }
      {
        page && showthumb && !featured.loading && featured.url && 
        <div className="Image">
          <img
            src={ featured.url }
            alt={ featured.alt }
          />
        </div>
      }
      {
        page && showtitle &&
        <h2 className="Title">{ page.title.rendered }</h2>
      }
      {
        page && showexcerpt &&
        <div 
          className="Excerpt"
          dangerouslySetInnerHTML={{
            __html: page.excerpt.rendered
          }}
        />
      }
      {
        page && showcontent &&
        <div 
          className="Content"
          dangerouslySetInnerHTML={{
            __html: page.content.rendered
          }}
        />
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