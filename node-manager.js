// the purpose of node-manager is to handle hacknet nodes for us
// the primary reason for doing it at all is simply for netburner augs.

export async function main(ns) {
    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("sleep");
    const hn = ns.hacknet;
    var options = ["level", "ram", "core", "node"];
    while(true) {
        var maxNodes = hn.numNodes();
        var needsNode = false;
        if (maxNodes === 0) {
            needsNode = true;
            maxNodes = 1;
        }
        for (var i = 0; i < maxNodes; i++) {
            for (var o = (needsNode ? 3 : 0); o < options.length; o++) {
                // var allowancePercentage = 0.00001;
                var allowancePercentage = 0.02;
                var playerMoney = ns.getServerMoneyAvailable("home");
                var costOfThing = 0;
                switch(o) {
                    case 0:
                        costOfThing = hn.getLevelUpgradeCost(i, 1);
                        break;
                    case 1:
                        costOfThing = hn.getRamUpgradeCost(i, 1);
                        break;
                    case 2:
                        costOfThing = hn.getCoreUpgradeCost(i, 1);
                        break;
                    case 3:
                        costOfThing = hn.getPurchaseNodeCost();
                        break;
                }
                
                var shouldPurchase = playerMoney * allowancePercentage >= costOfThing;
                costOfThing = Math.round(costOfThing);
                if (shouldPurchase) {
                    switch(o) {
                        case 0:
                            hn.upgradeLevel(i, 1);
                            ns.print("upgraded level n:"+i+" ("+costOfThing+")");
                            break;
                        case 1:
                            hn.upgradeRam(i, 1);
                            ns.print("upgraded ram   n:"+i+" ("+costOfThing+")");
                            break;
                        case 2:
                            hn.upgradeCore(i, 1);
                            ns.print("upgraded core  n:"+i+" ("+costOfThing+")");
                            break;
                        case 3:
                            hn.purchaseNode()
                            ns.print("purchased node ("+costOfThing+")");
                            break;
                    }  
                }
            }
        }
        await ns.sleep(200);
    }
}