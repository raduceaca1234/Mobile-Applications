package com.example.myapplication

import android.content.ContentValues
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import java.text.SimpleDateFormat
import java.util.*

class AddActivity : AppCompatActivity() {
    var helper: DBHelper? = null
    var TxTitle: EditText? = null
    var TxDetail: EditText? = null
    var id: Long = 0
    protected override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add)
        helper = DBHelper(this)
        id = getIntent().getLongExtra(DBHelper.row_id, 0)
        TxTitle = findViewById(R.id.txTitle_Add) as EditText?
        TxDetail = findViewById(R.id.txDetail_Add) as EditText?
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        getMenuInflater().inflate(R.menu.add_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.save_add -> {
                val title = TxTitle!!.text.toString().trim { it <= ' ' }
                val detail = TxDetail!!.text.toString().trim { it <= ' ' }

                //Get Date
                val calendar = Calendar.getInstance()
                val simpleDate =
                    SimpleDateFormat("MMM dd, yyyy")
                val created = simpleDate.format(calendar.time)
                val values = ContentValues()
                values.put(DBHelper.row_title, title)
                values.put(DBHelper.row_note, detail)
                values.put(DBHelper.row_created, created)

                //Create Condition if Title and Detail is empty
                if (title == "" && detail == "") {
                    Toast.makeText(this@AddActivity, "Nothing to save", Toast.LENGTH_SHORT).show()
                } else {
                    helper?.insertData(values)
                    Toast.makeText(this@AddActivity, "Saved", Toast.LENGTH_SHORT).show()
                    finish()
                }
            }
        }
        return super.onOptionsItemSelected(item)
    }
}