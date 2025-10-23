import { v4 as uuidv4 } from 'uuid'
const { 
  registerBlockType 
} = wp.blocks
const { 
  useBlockProps
} = wp.blockEditor
const {
  apiFetch
} = wp
const {
  useSelect
} = wp.data
const {
  useState,
  useEffect
} = wp.element

import metadata from 'blocks/children/block.json'
import './editor.scss';

const Edit = props => {
  
  const {
    attributes, 
    setAttributes 
  } = props  
  const { 
    blockId
  } = attributes;
  const blockProps = useBlockProps()
  const postId = useSelect(
    select => select('core/editor').getCurrentPostId(), 
    []
  )
  const [ children, setChildren ] = useState()

  useEffect(() => {

    if (!blockId) {

      setAttributes({ blockId: uuidv4() })
    }

    apiFetch({ 
      path: 'poeticsoft/contentpayment/getchildren?postid=' + postId
    })
    .then(children => {

      setChildren(children)
    })

  }, [])
   
  return <div 
    { ...blockProps}
    dangerouslySetInnerHTML={{
      __html: children ? children : ''
    }}
  />
}

const Save = () => null

registerBlockType(
  metadata.name,
  {
    edit: Edit,
    save: Save
  }
)