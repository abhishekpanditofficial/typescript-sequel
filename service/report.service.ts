import { SellerService } from ".";

import db
 from "../models/report_models";
const Report = (<any>db).report;
const Order = (<any>db).order;
const Sequelize = (<any>db).Sequelize;
const Op = Sequelize.Op;



const getProductSearches = async (sellerId: any) => {
    const count = await Report.count({
        where: { requestType: "on_search" , sellerId: sellerId},
      });
    return count;
}


const totalBuyerApps = async (sellerId: any) => {
    const count = await Report.count({
        distinct: true,
        col: 'bapId',
        where: {sellerId: sellerId }
      });
    return count;
}



const allSellerProductSearches = async (aggregatorId: any) => {
  const getAllSellers = await SellerService.getAllSeller(aggregatorId);
  const sellerIds = (<any>getAllSellers).map((seller: any) => seller.id);

  const count = await Report.count({
    where: { requestType: "on_search" , sellerId: sellerIds},
  });
  
  return count;
}


const allSellertotalBuyerApps = async (aggregatorId: any) => {
    const getAllSellers = await SellerService.getAllSeller(aggregatorId);
    const sellerIds = (<any>getAllSellers).map((seller: any) => seller.id);

    const count = await Report.count({
        distinct: true,
        col: 'bapId',
        where: {sellerId: sellerIds }
      });

    return count;
}




const downloadReport = async (sellerId: any, from: any, to: any) => {
   try {
    const report = await Order.findAll({
        where: {
          sellerId: sellerId,
          createdAt: {
              [Op.between]: [from, to]
          },
        },
        attributes: { exclude: ['bapId', 'bppId'] },
        raw: true
      })
      return report;
   } catch (error: any) {
    console.log(error.message);
   }
}

const topBuyerApps = async (sellerId: any) => {
    const report = await Order.findAll({
        limit: 5,
        where: {
          sellerId: sellerId,
        },
        attributes: [
            'bapId',
            [(<any>db).sequelize.fn('COUNT', (<any>db).sequelize.col('bapId')), 'buyerCount'],
        ],
        raw: true,
        group: 'bapId',
        order: [[(<any>db).sequelize.literal('buyerCount'), 'DESC']]
      })
      return report;
}

const topSellers = async (aggregatorId: any) => {
    try {
        const getAllSellers = await SellerService.getAllSeller(aggregatorId);
        const sellerIds = (<any>getAllSellers).map((seller: any) => seller.id);
        let output : Array<Object> = [];
    
        const reports = await Order.findAll({
            limit: 5,
            where: {
              sellerId: sellerIds,
            },
            attributes: [
                'sellerId',
                [(<any>db).sequelize.fn('COUNT', (<any>db).sequelize.col('sellerId')), 'sellerCount'],
            ],
            group: 'sellerId',
            raw: true,
            order: [[(<any>db).sequelize.literal('sellerCount'), 'DESC']]
          })
      
          // Now fetch Sellers using the sellerIds
          for(let report of reports){
            const seller = await SellerService.getSellerById(report.sellerId);
            const sellerInfo = seller[0];
            output.push({name: (<any>sellerInfo).sellerBusinessName, logo: (<any>sellerInfo).logo, count: report.sellerCount});
          }
          return output;  
    } catch (error: any) {
        console.log(error.message);
    }
}

export default {getProductSearches, totalBuyerApps, allSellerProductSearches, allSellertotalBuyerApps, downloadReport, topBuyerApps, topSellers}