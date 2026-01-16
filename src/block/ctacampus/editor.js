import './editor.scss'

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
  useState,
  useEffect
} = wp.element
const {
  PanelBody,
  __experimentalNumberControl,
  TextControl,
  Button, 
  Modal
} = wp.components
const { 
  useSelect 
} = wp.data
const {
  apiFetch
} = wp

import { 
  PageSelector
} from './pageselector';

import metadata from 'blocks/ctacampus/block.json'
import './editor.scss'
    
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
    setAttributes,
    clientId
  } = props  
  const { 
    blockId,
    refClientId,
    targetId,
    buttonText,
    targetText,
    discount
  } = attributes  
  const blockProps = useBlockProps()
  const [ pagesList, setPagesList ] = useState(null)
  const [ editingContents, setEditingContents ] = useState(false)

  useEffect(() => {

    apiFetch({ path: '/poeticsoft/contentpayment/campus/pages' })
    .then(setPagesList)

  }, [])

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

  }, [clientId])
   
  return <>
    <InspectorControls>
      <PanelBody 
        className="CTACampus"
        title={ 'Opciones del Bloque' } 
        initialOpen={ true }
      >
        <div className="Controls">
          <PageSelector
            attributes={  attributes }
            setAttributes={ setAttributes }
            pagesList={ pagesList }
          />
          <__experimentalNumberControl
            className="Discount"
            label="Descuento"
            isShiftStepEnabled={ true }
            shiftStep={ 1 }
            value={ discount }
            onChange={ 
              value => setAttributes({
                discount: value
              })
            }
          />
          <Button
            className="Contents"
            variant="primary"
            onClick={ () => setEditingContents(true) }
          >
            Text Contents
          </Button>
        </div>
      </PanelBody>
    </InspectorControls>
    <div { ...blockProps }>
      {
        targetId && pagesList ?
        <div className="
          block-editor-block-list__block 
          wp-block wp-block-buttons 
          block-editor-block-list__layout 
          is-layout-flex wp-block-buttons-is-layout-flex
          "
        >
          <div 
            className="
              block-editor-block-list__block wp-block 
              wp-block-button
            "
          >
            <div 
              className="
                block-editor-rich-text__editable 
                wp-block-button__link 
                wp-element-button 
                rich-text
              "
            >
              {
                buttonText
                ||
                pagesList.find(p => p.id == targetId).title
              }
            </div>
          </div>
        </div>
        :
        <div className="NoTree">
          { `${ buttonText || 'Selecciona Página en Campus' }` }
        </div>
      }
      {        
        editingContents &&
        <Modal 
          title="CTA Content" 
          className="CTAEditTexts"
          onRequestClose={ () => setEditingContents(false) }
        >
          <TextControl
            label="Texto botón"
            value={ buttonText }
            onChange={ 
              value => setAttributes({
                buttonText: value
              })
            }
            placeholder="Call to action"
          />
          <div className="EditContentLabel">Texto target</div>
          <RichText
            className="EditContent"
            tagName="div"
            value={ targetText }
            allowedFormats={[ 
              'core/bold', 
              'core/italic' 
            ]}
            onChange={ 
              value => setAttributes({ 
                targetText: value 
              }) 
            }
            placeholder="Condiciones"
          />
        </Modal>
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