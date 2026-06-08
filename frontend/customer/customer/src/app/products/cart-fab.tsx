'use client'
import './cart-fab.css';

interface CartFloatingActionButtonProps {
    badge?: number
    badgeMax?: number
    label?: string
    icon?: React.ReactNode
    disabled?: boolean
    onClick: ()=>void
}

export function CartFAB({badge=0, badgeMax = 99, label="장바구니 열기", icon, disabled, onClick } : CartFloatingActionButtonProps){

    const displayBadge = badge !== undefined && badge > 0
    const badgeLabel = badgeMax && badge && badge > badgeMax ? `${badgeMax}+` : badge

    return (
       <button className="fab-button" onClick={onClick} disabled={disabled} aria-label={label}>
            <span className="fab-icon">
                {icon || <span className="fab-text">🛒</span>}
            </span>

            {displayBadge && (
                <div className='fab-badge'>{badgeLabel}</div>
            )}
        </button>
    );
}