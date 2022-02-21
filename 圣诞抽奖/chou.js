

"use strict";
(function() {

    window.addEventListener("load", init);
    function init() {
        id("view").addEventListener("click", show);
        id("start").addEventListener("click", start);
    }

    async function start() {
        let cards = qsa(".square");
        if (cards.length !== 0) {
            let times = 48 * (Math.random() + 1);
            times = Math.floor(times);
            selectTimes(0, cards, times, 200)
        }
    }

    function selectTimes(times, cards, timesLimit,speedDif) {
        if (times === timesLimit) {
            endGame();
        } else {
            if (times % 16 === 0) {
                cards[15].classList.remove("select");
            } else {
                cards[times % 16 - 1].classList.remove("select");
            }
            cards[times % 16].classList.add("select");
            console.log(times);
            if (times > timesLimit * 0.85) {
                setTimeout(selectTimes, speedDif, times + 1, cards, timesLimit, speedDif + 100);
            } else {
                setTimeout(selectTimes, 200, times + 1, cards, timesLimit, speedDif);
            }
        }
    }

    function endGame() {
        let element = qsa(".select")[0];
        id("win").textContent = "恭喜" + id("name").value + "喜提" + element.id + "元!";
        setTimeout(function () {
            let currentChild = id("board").children.length;
            for (let i = 0; i < currentChild; i++) {
                id("board").lastChild.remove();
            }
            id("name").disabled = false;
            id("money").disabled = false;
            id("name").value = "";
            id("money").value = "";
            id("win").textContent = "";
        }, 10000)
    }

    function show() {
        let name = id("name").value;
        let money = id("money").value;
        if (name.trim() !== "" && money.trim() !== "") {
            id("name").disabled = true;
            id("money").disabled = true;
            money = parseInt(money);
            let moneyList = createMoney(money);
            for (let i = 0; i < 16; i++) {
                let card = gen("div");
                card.classList.add("square");
                card.classList.add("oneSix")
                let text = gen("p")
                if (moneyList[i] !== 0) {
                    text.textContent = moneyList[i] + "元";
                } else {
                    text.textContent = "谢谢惠顾！";
                }
                text.classList.add("scenario");
                card.appendChild(text);
                card.id = moneyList[i];
                id("board").appendChild(card);
            }
        }
    }

    function createMoney(money) {
        let list = [];
        for (let i = 0; i < 16; i++) {
            if (i === 9) {
                list.push(0)
            } else if (i === 10) {
                list.push((money * (Math.random()*9 + 1)).toFixed(2));
            } else {
                list.push((money * 8 / 5 * Math.random()).toFixed(2));
            }
        }
        return list;
    }

    function qsa(selector) {
        return document.querySelectorAll(selector);
    }

    function gen(tagName) {
        return document.createElement(tagName);
    }

    function id(id) {
        return document.getElementById(id);
    }
})();
