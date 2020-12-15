import {WstackProps} from '@app/types/widget'
import {FC} from 'react'

interface StackProps extends WstackProps {
  justifyContent: 'flex-start' | 'center' | 'flex-end'
  alignItems: 'flex-start' | 'center' | 'flex-end'
}
export const Stack: FC<StackProps> = ({children, ...props}) => {
  const {justifyContent = 'flex-start', alignItems = 'flex-start', ...wstackProps} = props
  const {flexDirection = 'row'} = wstackProps

  const JustifyContentFlexStart: FC<WstackProps> = ({children, ...props}) => {
    const {flexDirection = 'row'} = props
    return (
      <wstack {...props}>
        <wstack flexDirection={flexDirection}>{children}</wstack>
        <wspacer></wspacer>
      </wstack>
    )
  }
  const JustifyContentCenter: FC<WstackProps> = ({children, ...props}) => {
    const {flexDirection = 'row'} = props
    return (
      <wstack {...props}>
        <wspacer></wspacer>
        <wstack flexDirection={flexDirection}>{children}</wstack>
        <wspacer></wspacer>
      </wstack>
    )
  }
  const JustifyContentFlexEnd: FC<WstackProps> = ({children, ...props}) => {
    const {flexDirection = 'row'} = props
    return (
      <wstack {...props}>
        <wspacer></wspacer>
        <wstack flexDirection={flexDirection}>{children}</wstack>
      </wstack>
    )
  }
  const AlignItemsFlexStart: FC<WstackProps> = ({children, ...props}) => {
    const {flexDirection = 'row', ...wstackProps} = props
    return (
      <wstack {...wstackProps} flexDirection={flexDirection === 'row' ? 'column' : 'row'}>
        <wstack flexDirection={flexDirection}>{children}</wstack>
        <wspacer></wspacer>
      </wstack>
    )
  }
  const AlignItemsCenter: FC<WstackProps> = ({children, ...props}) => {
    const {flexDirection = 'row', ...wstackProps} = props
    return (
      <wstack {...wstackProps} flexDirection={flexDirection === 'row' ? 'column' : 'row'}>
        <wspacer></wspacer>
        <wstack flexDirection={flexDirection}>{children}</wstack>
        <wspacer></wspacer>
      </wstack>
    )
  }
  const AlignItemsFlexEnd: FC<WstackProps> = ({children, ...props}) => {
    const {flexDirection = 'row', ...wstackProps} = props
    return (
      <wstack {...wstackProps} flexDirection={flexDirection === 'row' ? 'column' : 'row'}>
        <wspacer></wspacer>
        <wstack flexDirection={flexDirection}>{children}</wstack>
      </wstack>
    )
  }
  const JustifyContentMap: Record<StackProps['justifyContent'], FC<WstackProps>> = {
    'flex-start': JustifyContentFlexStart,
    center: JustifyContentCenter,
    'flex-end': JustifyContentFlexEnd,
  }
  const AlignItemsMap: Record<StackProps['alignItems'], FC<WstackProps>> = {
    'flex-start': AlignItemsFlexStart,
    center: AlignItemsCenter,
    'flex-end': AlignItemsFlexEnd,
  }
  return h(JustifyContentMap[justifyContent], {...wstackProps}, h(AlignItemsMap[alignItems], {flexDirection}, children))
}

export const Row: FC<StackProps> = ({children, ...props}) => {
  props.flexDirection = 'row'
  return <Stack {...props}>{children}</Stack>
}

export const Col: FC<StackProps> = ({children, ...props}) => {
  props.flexDirection = 'column'
  return <Stack {...props}>{children}</Stack>
}
