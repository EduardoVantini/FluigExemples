select convert(varchar(2), codtipodistrato) + ' - ' + dsctipodistrato as 'Dados'
    ,codtipodistrato as 'codtipodistrato'
from xtipodistrato


select convert(varchar(2), codmotivodistrato) + ' - ' + dscmotivodistrato as 'Dados'
    ,codmotivodistrato
from xmotivodistrato





select p.codfilial as 'codfilial'
    ,p.codccusto as 'codccusto'
    ,p.codnatfinanceirarec as 'codnatfinanceirarec'
    ,p.codnatfinanceirapag as 'codnatfinanceirapag'
    ,p.codtdorec as 'codtdorec'
    ,p.codtdopag as 'codtdopag'
from xcomponente c join xtipoparcela t on c.cod_tipo_parc = t.cod_tipo_parc
    join xparametrostipoparcela p on  t.cod_tipo_parc = p.cod_tipo_parc
where c.cod_compn = '850' and p.codcoligada = 22

select e.codfilial as 'codfilial'
    ,e.codccusto as 'codccusto'
    ,e.codnatfinanceirarec as 'codnatfinanceirarec'
    ,e.codnatfinanceirapag as 'codnatfinanceirapag'
    ,e.codtdo as 'codtdorec'
    ,e.codtdodev as 'codtdopag'
from xempreendimento e join xvenda v on e.cod_pess_empr = v.cod_pess_empr
where v.num_venda = 38989


/* 
Filial 
Centro de Custo
Natureza a Pagar
Natureza a Receber
Tipo de Documento a Pagar
Tipo de Documento a Receber
*/

