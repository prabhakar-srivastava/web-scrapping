import Image from 'next/image';

export enum TYPE {
    WHITE,
    BLACK
}
interface LoaderProps {
    type: TYPE
    loaderWidth?: number
    loaderHeight?: number
}

function Loader({ type, loaderHeight, loaderWidth }: LoaderProps) {
    return (
        <div>
            {type === TYPE.WHITE && <Image className='animate-spin' src={'/loading.svg'} alt='' width={loaderWidth ?? 30} height={loaderHeight ?? 30} />}
            {type === TYPE.BLACK && <Image className='animate-spin' src={'/loaderBlack.svg'} alt='' width={loaderWidth ?? 30} height={loaderHeight ?? 30} />}

        </div>
    )
}

export default Loader