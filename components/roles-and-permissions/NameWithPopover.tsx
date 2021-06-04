import { usePopperTooltip } from 'react-popper-tooltip';
import { PrimaryButton } from 'components/common/Button';
import { UserOutlined } from '@ant-design/icons'

const NameWithPopover = ({props}) => {
    
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        placement: 'right-start',
        delayHide: 300,
        delayShow: 200,
        offset: [-10, 10],
        interactive: true
    });

    return (
        <div className="inline-block cursor-default" ref={setTriggerRef}>
            <span>{props.value}</span>
            {visible && (
                <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container section-bg ' })}>
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                    <div className="flex items-center space-x-3 px-4 py-3 pr-6">
                        <div className=" flex items-start p-2 text-white bg-gray-7 rounded-full">
                            <UserOutlined />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-gray-10 dark:text-gray-1">
                                {props.value}
                            </h1>
                            <p className="text-xs text-gray-7 lowercase">{props.value.replace(/\s/g, "")}@email.com</p>
                        </div>
                    </div>

                    <hr/>
                    <div className="px-4 py-2 text-gray-10 dark:text-gray-1">
                        <div className="text-xs my-1 capitalize">
                            <p className="px-2 py-1 inline-block text-xs bg-gray-2 border border-gray-5 dark:bg-gray-8 rounded-sm">Perk Management</p>
                        </div>
                        <div className="text-xs my-1 capitalize">
                            <p className="px-2 py-1 inline-block text-xs bg-gray-2 border border-gray-5 dark:bg-gray-8 rounded-sm">500 Applications</p>
                        </div>
                        <PrimaryButton type="button" extraStyle="!py-1 !mt-3">View Profile</PrimaryButton>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NameWithPopover