export const foodCategory = (category) => {
    if (category == 'Sushi') {
        return 'fas fa-fish';
    } else if (category == 'Completos') {
        return 'fas fa-hotdog';
    } else if (category == 'Sandwich') {
        return 'fas fa-hamburger';
    } else {
        return 'fas fa-cookie-bite';
    }
}

export const badgeColor = (category) => {
    if (category == 'Sushi') {
        return 'badge-sushi';
    } else if (category == 'Completos') {
        return 'badge-hotdog';
    } else if (category == 'Sandwich') {
        return 'badge-orange';
    } else {
        return 'badge-light';
    }
}


export const statusColor = (status) => {
    if (status == 'en espera') {
        return 'text-orange bold';
    } else if (status == 'en preparacion') {
        return 'text-secondary bold';
    } else if (status == 'lista para retirar') {
        return 'text-success bold';
    } else if (status == 'entregada') {
        return 'text-sandwich bold';
    } else {
        return 'text-dark bold';
    }
}