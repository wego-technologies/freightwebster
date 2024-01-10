import { TermData } from '@/hooks/get-terms'
import { Frame, MenuListItem } from 'react95'

interface Props {
  data: TermData[]
}

export const RequestedTab: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return <div>No Results</div>

  return (
    <div style={{ overflow: 'auto' }}>
      <Frame variant="well" style={{ width: '100%', padding: '10px' }}>
        {[...data]
          .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
          .map((termData) => (
            <MenuListItem key={termData.term} onClick={() => {}} style={{ pointerEvents: 'none' }}>
              {termData.term}
            </MenuListItem>
          ))}
      </Frame>
    </div>
  )
}
