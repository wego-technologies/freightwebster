import Image from 'next/image'

export const RequestedTab: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      Under construction
      <Image
        priority
        style={{ opacity: '0.6' }}
        src={'/under-construction.webp'}
        width={600}
        height={400}
        alt={'Under construction'}
      />
    </div>
  )
}
