const {
  SelectControl 
} = wp.components

export const LinkSelector = ({
  value,
  onChange
}) => { 

  const options = [
    {
      label: 'Botón',
      value: 'button'
    },
    {
      label: 'Link',
      value: 'link'
    }
  ]

  return (
    <SelectControl
      label="Elemento"
      value={ value }
      options={ options }
      onChange={ onChange }
    />
  )
}

export const HeadingSelector = ({
  value,
  onChange
}) => { 

  const options = [
    { label: 'H1', value: 'h1' },
    { label: 'H2', value: 'h2' },
    { label: 'H3', value: 'h3' },
    { label: 'H4', value: 'h4' },
    { label: 'H5', value: 'h5' },
    { label: 'H6', value: 'h6' },
  ]

  return (
    <SelectControl
      label="Elemento"
      value={ value }
      options={ options }
      onChange={ onChange }
    />
  )
}
