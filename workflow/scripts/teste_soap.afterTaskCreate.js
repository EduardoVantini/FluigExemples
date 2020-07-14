function afterTaskCreate(colleagueId) {

    var formData = new java.util.HashMap()

    var dsVenda = DatasetFactory.getDataset('dsTesteVenda', null, null, null)

    for (var i = 0; i < dsVenda.values.length; i++) {

        // var rowVenda = wdkAddChild("tblVenda")

        var numVenda = dsVenda.getValue(i, "num_venda")

        log.info(numVenda)

        // $("#pfVenda___" + rowVenda).val(numVenda)

        formData.put("pfVenda", numVenda)

        var c1 = DatasetFactory.createConstraint("venda", numVenda, numVenda, ConstraintType.MUST)
        var constraint = new Array(c1)

        var dsSinal = DatasetFactory.getDataset("dsTesteSinal", null, constraint, null)


        for (var k = 0; k < dsSinal.values.length; k++) {

            var Sinal = dsSinal.getValue(k, "idlan")

            log.info(Sinal)

            // $("#pfIdlan___" + rowVenda).val(Sinal)
            
            formData.put("pfIdlan", Sinal)
        }
    }

    hAPI.addCardChild("tblVenda", formData)
}