
const express = require('express')
const dotenv = require('dotenv')
const mssql = require('mssql')
var cors = require('cors')

const app = express();
const router = express.Router();

app.use(cors())
dotenv.config();

const config = {
    driver: process.env.SQL_DRIVER,
    server: process.env.SQL_SERVER,
    port: parseInt(process.env.SQL_PORT),
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_UID,
    password: process.env.SQL_PWD,
    options: {
        encrypt: false,
        enableArithAbort: false
    },
};
const pool = new mssql.ConnectionPool(config);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('?? Teaming up with NodeJS and SQL Server');
});

//TBM 및 위험성평가 근로자 확인 불러오기
app.get('/WorkerChk', async (req, res) => {
    //URL의 쿼리로 작업지시번화와 근로자코드를 받아옴.
 
        const orderSeq = req.query.Doc
        const workerSeq = req.query.Worker

        // console.log(orderSeq)
        // console.log(workerSeq)

    try {
        await pool.connect();
        
        const result = await pool.request()
            .input('OrderNo', mssql.NVarChar, orderSeq)
            .input('WorkerNo', mssql.NVarChar, workerSeq)
            .execute(`dbo.SP_GetOrderMST_4WorkerChk`);
        const posts = result.recordset;

        
        if (posts) {
            return res.json(posts);
        } else {
            return res.status(404).json({
                message: 'Record not found'
            });
        }      
             
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);        
    }    
});

//위험성평가 체크리스트 불러오기
app.get('/OrderView/Risk/:OrderSeq', async (req, res) => {
    const { OrderSeq } = req.params
    // console.log(OrderSeq)

    try {
        await pool.connect();
        
        const result = await pool.request()
            .input('OrderSeq', mssql.Int, OrderSeq)
            .execute(`dbo.SP_GetOrderRiskChk_4OrderView`);
        const posts = result.recordset;

        
        if (posts) {
            return res.json(posts);
        } else {
            return res.status(404).json({
                message: 'Record not found'
            });
        }      
             
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);        
    }    
});
//투입차량 불러오기
app.get('/OrderView/Car/:OrderSeq', async (req, res) => {
    const { OrderSeq } = req.params
    // console.log(OrderSeq)

    try {
        await pool.connect();
        
        const result = await pool.request()
            .input('OrderSeq', mssql.Int, OrderSeq)
            .execute(`dbo.SP_GetOrderCar_4OrderView`);
        const posts = result.recordset;

        
        if (posts) {
            return res.json(posts);
        } else {
            return res.status(404).json({
                message: 'Record not found'
            });
        }      
             
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);        
    }    
});
//투입인력 불러오기
app.get('/OrderView/Man/:OrderSeq', async (req, res) => {
    const { OrderSeq } = req.params
    // console.log(OrderSeq)

    try {
        await pool.connect();
        
        const result = await pool.request()
            .input('OrderSeq', mssql.Int, OrderSeq)
            .execute(`dbo.SP_GetOrderMan_4OrderView`);
        const posts = result.recordset;

        
        if (posts) {
            return res.json(posts);
        } else {
            return res.status(404).json({
                message: 'Record not found'
            });
        }      
             
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);        
    }    
});
//위험성평가 근로자 의견 불러오기 //4OrderView
app.get('/OrderView/Comm/:OrderSeq', async (req, res) => {
    const { OrderSeq } = req.params

    try {
        await pool.connect();
        
        const result = await pool.request()
            .input('OrderSeq', mssql.Int, OrderSeq)
            .execute(`dbo.SP_GetOrderRiskComm_4OrderView`);
        const posts = result.recordset;

        
        if (posts) {
            return res.json(posts);
        } else {
            return res.status(404).json({
                message: 'Record not found'
            });
        }      
             
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);        
    }    
});

//위험성평가 근로자 의견 불러오기 //4WorkerChk
app.get('/WorkerChk/Comm/:OrderSeq/:WorkerSeq', async (req, res) => {
    const { OrderSeq } = req.params
    const { WorkerSeq } = req.params
 
        // console.log(OrderSeq)
        // console.log(WorkerSeq)

    try {
        await pool.connect();
        
        const result = await pool.request()
            .input('OrderSeq', mssql.NVarChar, OrderSeq)
            .input('WorkerSeq', mssql.NVarChar, WorkerSeq)
            .execute(`dbo.SP_GetOrderRiskComm_4WorkerChk`);
        const posts = result.recordset;

        
        if (posts) {
            return res.json(posts);
        } else {
            return res.status(404).json({
                message: 'Record not found'
            });
        }      
             
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);        
    }    
});

//위험성평가 근로자 의견 Update
app.post('/WorkerChk/Comm/Update/', async (req, res) => {
    //console.log(req.body)

    //console.log(`EXEC SP_UpdateOrderRiskComm ` + req.body.OrderRiskCommSeq + `,` + req.body.OrderNo + `,` + req.body.CommMan + `,'` + req.body.Comment + `','` + req.body.Solution + `',` + req.body.isStop)
    try {
        await pool.connect();
                
        const result = await pool.request()
            .input('OrderRiskCommSeq', mssql.Int, req.body.OrderRiskCommSeq)
            .input('OrderSeq', mssql.Int, req.body.OrderNo)
            .input('CommMan', mssql.Int, req.body.CommMan)
            .input('Comment', mssql.NVarChar, req.body.Comment)
            .input('Solution', mssql.NVarChar, req.body.Solution)
            .input('isStop', mssql.Bit, req.body.isStop)
            .execute(`dbo.SP_UpdateOrderRiskComm`);
             
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);        
    }    
});
//위험성평가 근로자 의견 Delete
app.post('/WorkerChk/Comm/Delete/', async (req, res) => {
    // console.log(req.body)
    try {
        await pool.connect();
        
        const result = await pool.request()
            .input('OrderRiskCommSeq', mssql.Int, req.body.OrderRiskCommSeq)
            .input('DelMan', mssql.Int, req.body.CommMan)
            .execute(`dbo.SP_DeleteOrderRiskComm`);
             
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);        
    }    
});

//위험성평가 근로자 확인
app.post('/WorkerChk/Order/Chk', async (req, res) => {
    //console.log(req.body)
   
    try {
        await pool.connect();
                
        const result = await pool.request()
            .input('OrderSeq', mssql.Int, req.body.OrderNo)
            .input('ManSeq', mssql.Int, req.body.CommMan)
            .input('SignDate', mssql.DateTime, req.body.SignDate)
            .execute(`dbo.SP_UpdateOrderManSign`);
             
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);        
    }    
});

app.get('/postwork/:conname/:status', async (req, res) => {
    // ./postwork/:conname/:status로 접속하면 해당 공사, status 별로 리스트 업
    // status = ALL, 전부표시
    const { conname } = req.params
    const { status } = req.params

    try {
        await pool.connect();
        
        const result = await pool.request()
            .input('ConName', mssql.VarChar, conname)
            .input('status', mssql.VarChar, status)
            .execute(`dbo.Get_PostWorkListByStatus`);
        const posts = result.recordset;

        if (posts) {
            return res.json(posts);
        } else {
            return res.status(404).json({
                message: 'Record not found'
            });
        }           
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);        
    }    
});



app.listen(process.env.PORT, () => {
    console.log(`Server started running on ${process.env.PORT} for ${process.env.NODE_ENV}`);
});