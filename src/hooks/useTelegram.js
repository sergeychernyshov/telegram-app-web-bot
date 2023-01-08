export function useTelegram(tg){

    const onClose = () => {
        tg.close()
    }

    const onToggleButton = () => {
        if( tg.MainButton.isVisible){
            tg.MainButton.show()
        }else{
            tg.MainButton.hide()
        }
    }

    return{
        tg,
        user: tg.initDataUnsafe?.user?.username,
        onClose,
        onToggleButton
    }
}