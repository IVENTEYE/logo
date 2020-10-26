const select = function () {
    const selectHeader = document.querySelectorAll('.select-header'),
        selectHeaderIcon = document.querySelectorAll('.select-header__icon'),
        selectItem = document.querySelectorAll('.select-body__item');

    const selectToggle = function (e) {
        this.parentElement.classList.toggle('active');
    };

    const selectToggleArrow = function (e) {
        document.querySelectorAll('.select').forEach(item => {
            item.addEventListener('click', (e) => {
                if (item.classList.contains('active')) {
                    selectHeader.forEach(item => {
                        if (item.classList.contains('select active')) {
                            item.classList.toggle('active');
                        }
                    });
                }
                // if (e.target.closest('.select-header')) {
                //     selectHeaderIcon.forEach(item => {
                //         item.classList.add('active');
                //     });
                // }
            });
        });
    };

    const selectChoose = function () {
        const text = this.innerHTML,
            select = this.closest('.select'),
            currentText = this.closest('.select').querySelector('.select-header__current');

        currentText.innerHTML = text;
        select.classList.remove('active');
        // document.querySelector('.select-header__icon').classList.remove('active');
    };

    if (document.querySelector('.select')) {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.select')) {
                document.querySelector('.select').classList.remove('active');
                // document.querySelector('.select-header__icon').classList.remove('active');
            }
        });
    }

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle);
    });

    selectToggleArrow();

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose);
    });
};

select();