const {
  useState,
  useMemo
} = wp.element
const {
  SelectControl,
  Button
} = wp.components
const {
  useSelect,
  dispatch
} = wp.data
const {
  parse
} = wp.blocks

export const PageSelector = ({
  thisPageId, 
  attributes, 
  setAttributes
}) => { 

  const { 
    pageid
  } = attributes

  const [refreshKey, setRefreshKey ] = useState(0)

  const refreshPagesList = () => {

    dispatch('core')
    .invalidateResolution(
      'getEntityRecords',
      [
        'postType', 
        'page', 
        { 
          status: 'publish', 
          per_page: -1 
        } 
      ]
    )

    setRefreshKey(Math.random())
  }
    
  const pagesList = useSelect(
    select => {

      return select('core')
      .getEntityRecords(
        'postType', 
        'page', 
        { 
          per_page: -1,
          status: 'publish'
        }
      )
    }, 
    [refreshKey]
  )
    
  const buildHierarchy = (
    pagesList, 
    parent = 0, 
    level = 0
  ) => {

    const children = pagesList
    .filter(p => p.parent === parent)

    return children
    .flatMap(page => {

      const prefix = '—'.repeat(level)
      const label = `${prefix} ${page.title.rendered || '(Sin título)'}`

      return [
        { label, value: page.id },
        ...buildHierarchy(pagesList, page.id, level + 1),
      ]
    })
  }

  const allowedPage = pageid => {

    if(pageid == thisPageId) { return false } // Misma página, no permitido

    const page = pagesList.find(p => p.id == pageid)
    const blocks = parse(page.content.raw)
    const blocksinsertpage = blocks.filter(
      b => b.name == 'poeticsoft/insertpage'
    )
    if(!blocksinsertpage.length) { return true } // Pagina sin inserts, permitido

    const blocksinsertthispage = blocksinsertpage
    .filter(b => b.attributes.pageid == thisPageId)

    if(blocksinsertthispage.length > 0) { return false } // Pagina con inserts de la misma página, no permitido

    return blocksinsertpage
    .reduce((result, b) => {

      result = result && allowedPage(b.attributes.pageid)

      return result

    }, true)

  }

  const options = useMemo(
    () => {

      if (!pagesList) return [{ 
        label: 'Cargando páginas...', 
        value: 0 
      }]

      const allowedpages = pagesList
      .filter(p => allowedPage(p.id))
      .sort(
        (a, b) => {

          return a.menu_order - b.menu_order
        }
      )

      return [
        { 
          label: 'Selecciona una página', 
          value: 0 
        },
        ...buildHierarchy(allowedpages),
      ]

    }, 
    [ pagesList ]
  )

  return (
    <SelectControl
      label={
        <div className="TitleRefresh">
          <div className="Title">
            Seleccionar Página
          </div>
          <Button 
            className="Refresh"
            variant="secondary"
            onClick={ refreshPagesList }
          >
            Recargar
          </Button>
        </div>
      }
      value={ pageid }
      options={ options }
      onChange={
        value => setAttributes({
          pageid: parseInt(value)
        })
      }
    />
  )
}
